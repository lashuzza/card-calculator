import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  CircularProgress, 
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Tabs,
  Tab,
  IconButton,
  Tooltip
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import html2pdf from 'html2pdf.js';

export default function PSABatchLookup() {
  const [inputMethod, setInputMethod] = useState(0);
  const [certInput, setCertInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [submissionData, setSubmissionData] = useState({
    name: '',
    email: '',
    notes: ''
  });

  const handleInputMethodChange = (event, newValue) => {
    setInputMethod(newValue);
    setCertInput('');
    setError(null);
    setResults(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('http://localhost:8000/api/psa/lookup/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cert_input: certInput,
          delay: 1.0
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to fetch data');
      }

      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create image preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1];
        
        const response = await fetch('http://localhost:8000/api/psa/lookup/image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64Image,
            prompt: `You are a helpful assistant specialized in identifying PSA certification numbers from images.
            Your task is to analyze the image and extract all PSA certification numbers.
            
            Rules:
            - PSA cert numbers can be 8 or 9 digits long
            - They are typically printed on PSA card slabs
            - They may appear as plain numbers or with a 'PSA' prefix
            - Ignore any other numbers that aren't PSA cert numbers
            
            Return ONLY the numbers themselves in a JSON array format like this:
            {
              "cert_numbers": ["12345678", "102304290"]
            }`
          }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.detail || 'Failed to process image');
        }

        setResults(data);
      };
      
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Clean up preview URL when component unmounts or new image is uploaded
  React.useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleExportPDF = () => {
    const content = document.getElementById('results-content');
    const opt = {
      margin: 1,
      filename: `psa-cards-batch-${Date.now()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(content).save();
  };

  const handleSubmitForReview = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/psa/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: submissionData.name,
          email: submissionData.email,
          notes: submissionData.notes,
          cert_range: { start: certInput, end: certInput },
          results: results
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to submit');
      }

      // Show success message with tracking number
      setError(null);
      alert(`Submission successful! Your tracking number is: ${data.tracking_number}`);
      setOpenSubmitDialog(false);
    } catch (err) {
      setError(err.message);
      alert('Failed to submit: ' + err.message);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        PSA Batch Card Lookup
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Tabs value={inputMethod} onChange={handleInputMethodChange} sx={{ mb: 3 }}>
          <Tab label="Enter Numbers" />
          <Tab label="Upload Image" />
        </Tabs>

        {inputMethod === 0 ? (
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                label="Certificate Numbers"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                required
                fullWidth
                helperText="Enter numbers separated by commas (e.g., 12345678, 87654321) or a range (e.g., 12345678-12345680)"
              />
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ minWidth: 100 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Lookup'}
              </Button>
            </Box>
          </form>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              type="file"
              onChange={handleImageUpload}
              disabled={loading}
            />
            <label htmlFor="image-upload">
              <Button
                variant="contained"
                component="span"
                disabled={loading}
                startIcon={<PhotoCamera />}
              >
                Upload Image
              </Button>
            </label>
            {imagePreview && (
              <Box sx={{ mt: 2, maxWidth: '100%', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={imagePreview} 
                  alt="Uploaded card"
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '300px',
                    objectFit: 'contain',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    filter: loading ? 'brightness(50%)' : 'none',
                    transition: 'filter 0.3s ease'
                  }} 
                />
                {loading && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      gap: 1
                    }}
                  >
                    <CircularProgress sx={{ color: 'white' }} />
                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                      Scanning image for PSA numbers...
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
            <Typography variant="body2" color="textSecondary">
              Upload an image containing PSA cert numbers
            </Typography>
          </Box>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {results && (
          <Box>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleExportPDF}
                disabled={!results}
              >
                Export PDF
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenSubmitDialog(true)}
                disabled={!results}
              >
                Submit for Review
              </Button>
            </Box>

            <div id="results-content">
              <Typography variant="h6" gutterBottom>
                Results Summary
              </Typography>
              <Typography>
                Total Processed: {results.total_processed}
                <br />
                Successful: {results.successful}
                <br />
                Failed: {results.failed}
              </Typography>

              {results.results.map((result, index) => (
                <Paper key={index} sx={{ p: 2, my: 2 }}>
                  <Typography variant="h6">
                    Certificate #{result.cert_number}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1">Title:</Typography>
                    <Typography>{result.listing.title}</Typography>
                    
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                      Description:
                    </Typography>
                    <Typography
                      component="pre"
                      sx={{
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'inherit',
                        fontSize: 'inherit'
                      }}
                    >
                      {result.listing.description}
                    </Typography>
                  </Box>
                </Paper>
              ))}

              {results.errors.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" color="error" gutterBottom>
                    Errors
                  </Typography>
                  {results.errors.map((error, index) => (
                    <Alert key={index} severity="error" sx={{ mb: 1 }}>
                      Certificate #{error.cert_number}: {error.error}
                    </Alert>
                  ))}
                </Box>
              )}
            </div>
          </Box>
        )}
      </Paper>

      <Dialog open={openSubmitDialog} onClose={() => setOpenSubmitDialog(false)}>
        <DialogTitle>Submit for Review</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Your Name"
              value={submissionData.name}
              onChange={(e) => setSubmissionData(prev => ({ ...prev, name: e.target.value }))}
              required
              fullWidth
            />
            <TextField
              label="Email Address"
              type="email"
              value={submissionData.email}
              onChange={(e) => setSubmissionData(prev => ({ ...prev, email: e.target.value }))}
              required
              fullWidth
            />
            <TextField
              label="Additional Notes"
              multiline
              rows={4}
              value={submissionData.notes}
              onChange={(e) => setSubmissionData(prev => ({ ...prev, notes: e.target.value }))}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSubmitDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitForReview} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 