import React from 'react';
import { Upload, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '../contexts/ThemeContext';

export default function GetQuote() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#1E293B]/40' : 'bg-[#F8FAFC]'}`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-[#1E293B]' : 'bg-white'} py-16 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className={`text-4xl font-bold tracking-tight sm:text-5xl ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
            Sell Your Card Collection
          </h1>
          <p className={`mt-4 text-lg ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            Get a competitive offer for your trading cards within 24 hours. We make selling your collection simple,
            secure, and profitable.
          </p>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className={isDark ? 'bg-[#1E293B] border-[#334155]' : ''}>
            <CardContent className="p-6">
              <div className="text-[#00E5FF] text-2xl font-bold">10k+</div>
              <p className={`mt-2 ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>Collections purchased</p>
            </CardContent>
          </Card>
          <Card className={isDark ? 'bg-[#1E293B] border-[#334155]' : ''}>
            <CardContent className="p-6">
              <div className="text-[#00E5FF] text-2xl font-bold">24hrs</div>
              <p className={`mt-2 ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>Average response time</p>
            </CardContent>
          </Card>
          <Card className={isDark ? 'bg-[#1E293B] border-[#334155]' : ''}>
            <CardContent className="p-6">
              <div className="text-[#00E5FF] text-2xl font-bold">100%</div>
              <p className={`mt-2 ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>Secure payment guarantee</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quote Form */}
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <form className="space-y-8" action="/api/submit-quote" method="POST">
          <div className={`space-y-6 ${isDark ? 'bg-[#1E293B]' : 'bg-white'} p-8 rounded-xl shadow-sm`}>
            <div className="space-y-4">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>Contact Information</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
                    First Name
                  </label>
                  <input
                    className={`mt-1 block w-full rounded-md px-3 py-2 ${
                      isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
                    } focus:outline-none focus:ring-2 focus:ring-[#00E5FF]`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
                    Last Name
                  </label>
                  <input
                    className={`mt-1 block w-full rounded-md px-3 py-2 ${
                      isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
                    } focus:outline-none focus:ring-2 focus:ring-[#00E5FF]`}
                    required
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
                  Email
                </label>
                <input
                  type="email"
                  className={`mt-1 block w-full rounded-md px-3 py-2 ${
                    isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
                  } focus:outline-none focus:ring-2 focus:ring-[#00E5FF]`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  className={`mt-1 block w-full rounded-md px-3 py-2 ${
                    isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
                  } focus:outline-none focus:ring-2 focus:ring-[#00E5FF]`}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>Collection Details</h2>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
                  Tell us about your collection
                </label>
                <textarea
                  className={`mt-1 block w-full rounded-md px-3 py-2 h-32 ${
                    isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
                  } focus:outline-none focus:ring-2 focus:ring-[#00E5FF]`}
                  placeholder="Include details about the types of cards, conditions, and any notable items"
                />
              </div>

              <div className="space-y-4">
                <label className={`block text-sm font-medium ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
                  Share your collection
                </label>
                <div className="grid gap-4">
                  <button
                    type="button"
                    className={`w-full h-24 rounded-md border-2 border-dashed ${
                      isDark ? 'border-[#475569] hover:border-[#00E5FF]' : 'border-[#94A3B8] hover:border-[#00E5FF]'
                    } focus:outline-none`}
                    onClick={() => document.getElementById("csvUpload")?.click()}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Upload className={`h-6 w-6 ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`} />
                      <span className={isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}>Upload CSV file</span>
                      <span className={isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}>
                        Drag and drop or click to browse
                      </span>
                    </div>
                  </button>
                  <input
                    id="csvUpload"
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={(e) => console.log(e.target.files)}
                  />

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className={`w-full border-t ${isDark ? 'border-[#475569]' : 'border-[#94A3B8]'}`} />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className={`${isDark ? 'bg-[#1E293B]' : 'bg-white'} px-2 ${
                        isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'
                      }`}>
                        Or
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
                      Collection Link
                    </label>
                    <div className="flex gap-2">
                      <input
                        className={`flex-1 rounded-md px-3 py-2 ${
                          isDark ? 'bg-[#334155] border-[#475569] text-[#F1F5F9]' : 'border-[#94A3B8]'
                        } focus:outline-none focus:ring-2 focus:ring-[#00E5FF]`}
                        placeholder="Paste a link to your collection (eBay, TCGPlayer, etc.)"
                      />
                      <button
                        type="button"
                        className={`p-2 rounded-md ${
                          isDark ? 'bg-[#334155] text-[#F1F5F9]' : 'bg-white border border-[#94A3B8] text-[#1E293B]'
                        } hover:bg-[#00E5FF] hover:text-[#1E293B] transition-colors`}
                      >
                        <LinkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full px-4 py-3 rounded-md flex items-center justify-center ${
                isDark ? 'bg-[#334155] text-[#F1F5F9]' : 'bg-[#1E293B] text-[#F1F5F9]'
              } hover:bg-[#00E5FF] hover:text-[#1E293B] transition-colors`}
            >
              Get Your Quote <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </form>

        <div className={`mt-8 text-center text-sm ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
          By submitting this form, you'll receive a response within 24 hours. All information provided is secure and
          confidential.
        </div>
      </div>
    </div>
  );
} 