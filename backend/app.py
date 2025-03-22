from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import sys
import os
import requests
from bs4 import BeautifulSoup
import json
import asyncio
from typing import List, Optional, Union
import time
import base64
from openai import OpenAI

# Load environment variables from .env file
load_dotenv()

# Verify OpenAI API key is set
if not os.getenv('OPENAI_API_KEY'):
    print("Warning: OPENAI_API_KEY not found in environment variables")

app = FastAPI()

# Add CORS middleware with more permissive settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

class CertRequest(BaseModel):
    cert_number: str

class CertRangeRequest(BaseModel):
    cert_input: str  # Can be either a range (e.g., "1234-5678") or comma-separated list (e.g., "1234,5678,9012")
    delay: Optional[float] = 1.0

class ConsignmentRequest(BaseModel):
    name: str
    email: str
    notes: Optional[str] = None
    cert_range: dict
    results: dict

class ImageRequest(BaseModel):
    image: str
    prompt: str

def get_psa_data(cert_number):
    """Fetch data from PSA API based on cert number"""
    print(f"Looking up PSA cert #{cert_number}")
    
    # PSA API access token
    access_token = "my6Rv4D-AdLXMa1E-uxBnXWN4hCgtzSBuhI1xT4AeyVbuz2CC17zeytB5XTtuEgvP4t9cg5N_t2vORhebuiaddmSRKfR5nuFtvCixc8ZyZ134cRSeSgwuSBg6oL-_FBtO0fazbQRFna30EL2Rkvtryo_sx-cwEsg0CyYFtSXnO4jRELuqt3XXVdnL-xbvMEyygEYcH9Q4H-ItzrAcKScasOsWxaquww1EYMBogvn9q4WcMEpE1My1sTpkBvarDe4n1yeOWNTPl9nA-dB7aOpR3XtnJGF0pyRSPt1tCmpGglpXLiB"
    
    url = f"https://api.psacard.com/publicapi/cert/GetByCertNumber/{cert_number}"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Accept': 'application/json'
    }
    
    try:
        print(f"Making request to PSA API: {url}")
        response = requests.get(url, headers=headers)
        print(f"PSA API response status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"PSA API response data: {json.dumps(data, indent=2)}")
            
            card_data = {'cert_number': cert_number}
            
            # Extract data from API response
            if 'PSACert' in data:
                cert_data = data['PSACert']
                print(f"Found PSACert data: {json.dumps(cert_data, indent=2)}")
                
                if isinstance(cert_data, dict):
                    card_data.update({
                        'year': str(cert_data.get('Year', '')),
                        'brand': cert_data.get('Brand', ''),
                        'card_name': cert_data.get('Subject', ''),
                        'grade': cert_data.get('Grade', ''),
                        'player': cert_data.get('Subject', ''),
                        'sport': cert_data.get('Sport', ''),
                        'set': cert_data.get('Set', '')
                    })
            else:
                print("No PSACert data found in response")
                # Try to extract data from root level
                card_data.update({
                    'year': str(data.get('Year', '')),
                    'brand': data.get('Brand', ''),
                    'card_name': data.get('Subject', ''),
                    'grade': data.get('Grade', ''),
                    'player': data.get('Subject', ''),
                    'sport': data.get('Sport', ''),
                    'set': data.get('Set', '')
                })
            
            print(f"Extracted card data: {json.dumps(card_data, indent=2)}")
            return card_data
        else:
            print(f"Error response from PSA API: {response.text}")
            return None
    except Exception as e:
        print(f"Error fetching PSA data: {str(e)}")
        return None

def generate_ebay_listing(card_data):
    """Generate eBay listing from card data"""
    print(f"Generating eBay listing for card data: {json.dumps(card_data, indent=2)}")
    
    if not card_data:
        print("No card data provided")
        return None
        
    # Create title - remove duplicates and clean up
    title_parts = []
    if 'grade' in card_data and card_data['grade']:
        title_parts.append(f"PSA {card_data['grade']}")
    if 'year' in card_data and card_data['year']:
        title_parts.append(card_data['year'])
    if 'brand' in card_data and card_data['brand']:
        title_parts.append(card_data['brand'].strip())
    if 'card_name' in card_data and card_data['card_name']:
        # Only add card_name if it's not already part of the brand
        card_name = card_data['card_name'].strip()
        if card_name.upper() not in card_data['brand'].upper():
            title_parts.append(card_name)
    
    # Remove any empty strings and join with spaces
    title = " ".join([part for part in title_parts if part])
    print(f"Generated title: {title}")
    
    # Create description with better formatting
    description = [
        f"# {title}",
        "\n## Card Details",
    ]
    
    details = []
    if 'cert_number' in card_data and card_data['cert_number']:
        details.append(f"• PSA Certificate Number: {card_data['cert_number']}")
    if 'grade' in card_data and card_data['grade']:
        details.append(f"• PSA Grade: {card_data['grade']}")
    if 'year' in card_data and card_data['year']:
        details.append(f"• Year: {card_data['year']}")
    if 'brand' in card_data and card_data['brand']:
        details.append(f"• Product: {card_data['brand'].strip()}")
    if 'card_name' in card_data and card_data['card_name']:
        details.append(f"• Card: {card_data['card_name'].strip()}")
    if 'player' in card_data and card_data['player'] and card_data['player'] != card_data['card_name']:
        details.append(f"• Player: {card_data['player'].strip()}")
    if 'sport' in card_data and card_data['sport']:
        details.append(f"• Sport: {card_data['sport']}")
    if 'set' in card_data and card_data['set']:
        details.append(f"• Set: {card_data['set']}")
    
    description.extend(details)
    
    description.extend([
        "\n## Authentication",
        f"• Verify this card at PSA's website: https://www.psacard.com/cert/{card_data['cert_number']}",
        "\n## Shipping & Handling",
        "• FREE secure shipping with tracking (United States only)",
        "• Professional packaging - Card will be shipped in a card saver between cardboard",
        "• Full insurance included",
        "\n## Return Policy",
        "• 30-day returns accepted if item is not as described",
        "• Buyer pays return shipping"
    ])
    
    listing = {
        "title": title,
        "description": "\n".join(description)
    }
    print(f"Generated listing: {json.dumps(listing, indent=2)}")
    return listing

@app.post("/api/psa/lookup")
async def lookup_cert(request: CertRequest):
    print(f"\nReceived lookup request for cert #{request.cert_number}")
    try:
        card_data = get_psa_data(request.cert_number)
        if card_data:
            listing = generate_ebay_listing(card_data)
            response_data = {
                "success": True,
                "card_data": card_data,
                "listing": listing
            }
            print(f"Sending response: {json.dumps(response_data, indent=2)}")
            return response_data
        
        error_msg = f"No data found for cert #{request.cert_number}"
        print(error_msg)
        return {"success": False, "error": error_msg}
    except Exception as e:
        error_msg = f"Error processing cert #{request.cert_number}: {str(e)}"
        print(error_msg)
        raise HTTPException(status_code=500, detail=error_msg)

async def process_cert_numbers(cert_input: str) -> List[str]:
    """Process cert input string into list of cert numbers"""
    cert_numbers = []
    
    # Remove any whitespace and split by comma
    parts = [p.strip() for p in cert_input.split(',')]
    
    for part in parts:
        if '-' in part:
            # Handle range format
            try:
                start, end = map(int, part.split('-'))
                if end < start:
                    raise ValueError("End number must be greater than start number")
                if end - start > 100:
                    raise ValueError("Maximum range of 100 certificates allowed")
                cert_numbers.extend(str(num) for num in range(start, end + 1))
            except ValueError as e:
                raise HTTPException(status_code=400, detail=str(e))
        else:
            # Handle individual number
            try:
                int(part)  # Validate it's a number
                cert_numbers.append(part)
            except ValueError:
                raise HTTPException(status_code=400, detail=f"Invalid certificate number: {part}")
    
    # Remove duplicates while preserving order
    return list(dict.fromkeys(cert_numbers))

async def process_image_with_openai(image_base64: str, prompt: str) -> List[str]:
    """Process image with OpenAI Vision API"""
    try:
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f"Bearer {os.getenv('OPENAI_API_KEY')}"
        }
        
        # Construct the image URL - either use the base64 or a direct URL
        image_url = image_base64 if image_base64.startswith('http') else f"data:image/jpeg;base64,{image_base64}"
        
        default_prompt = """You are a helpful assistant specialized in identifying PSA certification numbers from images.
        Your task is to analyze the image and extract all PSA certification numbers.
        
        Rules:
        - PSA cert numbers can be 8 or 9 digits long
        - They are typically printed on PSA card slabs
        - They may appear as plain numbers or with a 'PSA' prefix
        - Ignore any other numbers that aren't PSA cert numbers
        
        Return ONLY the numbers themselves in a JSON array format like this:
        {
          "cert_numbers": ["12345678", "102304290"]
        }"""
        
        payload = {
            "model": "gpt-4o",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": prompt or default_prompt,
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": image_url
                            },
                        },
                    ],
                },
            ],
            "max_tokens": 768
        }
        
        print("Sending request to OpenAI API...")
        print(f"Using image URL: {image_url[:100]}...")  # Print first 100 chars of URL
        
        response = requests.post(
            'https://api.openai.com/v1/chat/completions',
            headers=headers,
            json=payload,
            timeout=30
        )
        
        print(f"Response status: {response.status_code}")
        print(f"Response headers: {dict(response.headers)}")
        
        if not response.ok:
            error_text = response.text
            print(f"OpenAI API error: {response.status_code} - {error_text}")
            raise HTTPException(status_code=response.status_code, detail=f"OpenAI API error: {error_text}")
            
        result = response.json()
        print(f"OpenAI API response: {json.dumps(result, indent=2)}")
        
        # Extract the content from the response
        if 'choices' not in result or not result['choices']:
            raise ValueError("No choices in OpenAI response")
            
        content = result['choices'][0]['message']['content']
        print(f"Raw content from OpenAI: {content}")
        
        try:
            # Try to parse as JSON first
            parsed_content = json.loads(content)
            cert_numbers = parsed_content.get('cert_numbers', [])
        except json.JSONDecodeError:
            # If not JSON, try to extract numbers directly
            print("Failed to parse JSON, attempting to extract numbers directly")
            import re
            # Look for 8 or 9 digit numbers
            cert_numbers = re.findall(r'\b\d{8,9}\b', content)
        
        print(f"Extracted cert numbers: {cert_numbers}")
        
        # Validate the numbers - accept both 8 and 9 digits
        valid_numbers = [num for num in cert_numbers if num.isdigit() and len(num) in [8, 9]]
        print(f"Valid cert numbers: {valid_numbers}")
        
        if not valid_numbers:
            raise HTTPException(status_code=400, detail="No valid PSA certification numbers (8-9 digits) found in image")
            
        return valid_numbers
        
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {str(e)}")
        print(f"Response content: {response.text if 'response' in locals() else 'No response'}")
        raise HTTPException(status_code=500, detail=f"Failed to parse OpenAI response: {str(e)}")
    except requests.exceptions.RequestException as e:
        print(f"Request error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error making request to OpenAI: {str(e)}")
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        print(f"Full error details: {str(e.__class__.__name__)}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.post("/api/psa/lookup/image")
async def lookup_from_image(request: ImageRequest):
    try:
        # Process the image with OpenAI
        cert_numbers = await process_image_with_openai(request.image, request.prompt)
        
        if not cert_numbers:
            raise HTTPException(status_code=400, detail="No valid PSA certification numbers found in image")
        
        # Process the found cert numbers using the batch endpoint logic
        cert_input = ",".join(cert_numbers)
        batch_request = CertRangeRequest(cert_input=cert_input)
        return await lookup_cert_range(batch_request)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/psa/lookup/batch")
async def lookup_cert_range(request: CertRangeRequest):
    print(f"\nReceived batch lookup request for certs: {request.cert_input}")
    try:
        cert_numbers = await process_cert_numbers(request.cert_input)
        
        if len(cert_numbers) > 100:
            raise HTTPException(status_code=400, detail="Maximum of 100 certificates allowed")
        
        results = []
        errors = []
        
        for cert_num in cert_numbers:
            try:
                print(f"Processing cert #{cert_num}")
                card_data = get_psa_data(cert_num)
                if card_data:
                    listing = generate_ebay_listing(card_data)
                    results.append({
                        "cert_number": cert_num,
                        "success": True,
                        "card_data": card_data,
                        "listing": listing
                    })
                else:
                    errors.append({
                        "cert_number": cert_num,
                        "error": "No data found"
                    })
                
                # Add delay between requests to avoid rate limiting
                if cert_num != cert_numbers[-1]:
                    await asyncio.sleep(request.delay)
                    
            except Exception as e:
                errors.append({
                    "cert_number": cert_num,
                    "error": str(e)
                })
        
        response_data = {
            "success": True,
            "total_processed": len(cert_numbers),
            "successful": len(results),
            "failed": len(errors),
            "results": results,
            "errors": errors
        }
        
        print(f"Batch processing complete. Success: {len(results)}, Failures: {len(errors)}")
        return response_data
        
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid certificate numbers provided")
    except Exception as e:
        error_msg = f"Error processing cert range: {str(e)}"
        print(error_msg)
        raise HTTPException(status_code=500, detail=error_msg)

@app.post("/api/psa/submit")
async def submit_consignment(request: ConsignmentRequest):
    print(f"\nReceived consignment request from {request.name} ({request.email})")
    try:
        # Here you would typically:
        # 1. Save the submission to a database
        # 2. Send an email notification
        # 3. Generate a tracking number
        
        # For now, we'll just log it and return a success message
        print(f"Submission details: {json.dumps(request.dict(), indent=2)}")
        
        # Generate a simple tracking number
        tracking_number = f"CON-{request.cert_range['start']}-{request.cert_range['end']}-{int(time.time())}"
        
        return {
            "success": True,
            "tracking_number": tracking_number,
            "message": "Your submission has been received and will be reviewed shortly."
        }
        
    except Exception as e:
        error_msg = f"Error processing submission: {str(e)}"
        print(error_msg)
        raise HTTPException(status_code=500, detail=error_msg) 