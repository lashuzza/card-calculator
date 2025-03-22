import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const PSALookup = () => {
  const [certNumber, setCertNumber] = useState('')
  const [cardData, setCardData] = useState(null)
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { isDark } = useTheme()

  const lookupCert = async () => {
    setLoading(true)
    setError(null)
    setCardData(null)
    setListing(null)
    console.log('Looking up cert number:', certNumber)
    
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const response = await fetch('http://localhost:8000/api/psa/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cert_number: certNumber }),
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Response data:', data)
      
      if (data.success) {
        setCardData(data.card_data)
        setListing(data.listing)
      } else {
        setError(data.error || 'Failed to lookup card data')
      }
    } catch (error) {
      console.error('Error:', error)
      if (error.name === 'AbortError') {
        setError('Request timed out. The PSA API might be slow or unavailable. Please try again.')
      } else if (!window.navigator.onLine) {
        setError('You appear to be offline. Please check your internet connection.')
      } else {
        setError('Failed to connect to the server. Please make sure both frontend and backend servers are running.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && certNumber.trim()) {
      lookupCert()
    }
  }

  return (
    <div className={`container mx-auto p-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <h1 className="text-2xl font-bold mb-4">PSA Card Lookup</h1>
      
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter PSA cert number"
          value={certNumber}
          onChange={(e) => setCertNumber(e.target.value)}
          onKeyPress={handleKeyPress}
          className={`flex-1 p-2 rounded-md border ${
            isDark 
              ? 'bg-[#1E293B] border-gray-600 text-white' 
              : 'bg-white border-gray-300'
          }`}
        />
        <button
          onClick={lookupCert}
          disabled={loading || !certNumber.trim()}
          className={`px-4 py-2 rounded-md ${
            loading || !certNumber.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#00E5FF] hover:bg-[#00B8CC] text-[#1E293B]'
          }`}
        >
          {loading ? 'Looking up...' : 'Lookup'}
        </button>
      </div>

      {error && (
        <div className="p-4 mb-4 rounded-lg bg-red-100 border border-red-400 text-red-700">
          {error}
        </div>
      )}

      {cardData && (
        <div className={`p-4 rounded-lg mb-4 ${
          isDark ? 'bg-[#1E293B]' : 'bg-white'
        } shadow-lg`}>
          <h2 className="text-xl font-semibold mb-2">Card Information</h2>
          <pre className={`whitespace-pre-wrap ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {JSON.stringify(cardData, null, 2)}
          </pre>
        </div>
      )}

      {listing && (
        <div className={`p-4 rounded-lg ${
          isDark ? 'bg-[#1E293B]' : 'bg-white'
        } shadow-lg`}>
          <h2 className="text-xl font-semibold mb-2">eBay Listing</h2>
          <div className="mb-2">
            <strong>Title:</strong> {listing.title}
          </div>
          <div>
            <strong>Description:</strong>
            <pre className={`whitespace-pre-wrap mt-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {listing.description}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default PSALookup 