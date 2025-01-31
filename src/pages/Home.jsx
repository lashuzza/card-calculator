import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calculator, DollarSign, Scale, Banknote } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Home() {
  const { isDark } = useTheme();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-8 px-4 py-24 text-center lg:py-32">
        <div className="flex flex-col items-center gap-4">
          <h1 className={`text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
            Maximize Your Trading Card Profits
          </h1>
          <p className={`max-w-[600px] text-lg sm:text-xl ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
            Make data-driven decisions about buying, grading, and selling your cards with our advanced profit calculator
          </p>
        </div>
        <div className="flex flex-col gap-4 min-[400px]:flex-row">
          <Link 
            to="/calculator"
            className={`px-4 py-2 rounded-md flex items-center justify-center ${
              isDark ? 'bg-[#334155] text-[#F1F5F9]' : 'bg-[#1E293B] text-[#F1F5F9]'
            } hover:bg-[#00E5FF] hover:text-[#1E293B] transition-colors`}
          >
            Try Calculator <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link 
            to="/quote"
            className={`px-4 py-2 rounded-md flex items-center justify-center ${
              isDark ? 'bg-[#1E293B] text-[#F1F5F9]' : 'bg-white text-[#1E293B]'
            } border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors`}
          >
            Sell to Us
          </Link>
          <Link 
            to="/learn-more"
            className={`px-4 py-2 rounded-md flex items-center justify-center ${
              isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'
            } hover:bg-[#F8FAFC] transition-colors`}
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto grid gap-8 px-4 py-16 md:grid-cols-2 lg:grid-cols-3">
        <Card className={isDark ? 'bg-[#1E293B] border-[#334155]' : ''}>
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <Calculator className="h-12 w-12 text-[#00E5FF]" />
            <h3 className={`text-xl font-semibold ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
              Grade Value Calculator
            </h3>
            <p className={`text-center ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Calculate expected values across different PSA grades and make informed grading decisions
            </p>
          </CardContent>
        </Card>
        <Card className={isDark ? 'bg-[#1E293B] border-[#334155]' : ''}>
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <Scale className="h-12 w-12 text-[#00E5FF]" />
            <h3 className={`text-xl font-semibold ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
              Market Comparison
            </h3>
            <p className={`text-center ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Compare profits across different selling platforms including eBay, resellers, and consignment
            </p>
          </CardContent>
        </Card>
        <Card className={`md:col-span-2 lg:col-span-1 ${isDark ? 'bg-[#1E293B] border-[#334155]' : ''}`}>
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <DollarSign className="h-12 w-12 text-[#00E5FF]" />
            <h3 className={`text-xl font-semibold ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
              Fee Calculator
            </h3>
            <p className={`text-center ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              Account for all fees including grading, shipping, and platform fees to see true profit potential
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Customization Section */}
      <section className={`container mx-auto px-4 py-16 ${isDark ? 'bg-[#1E293B]/40' : 'bg-[#F8FAFC]'}`}>
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="flex flex-col gap-6">
            <h2 className={`text-3xl font-bold ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
              Customize Your Analysis
            </h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="h-8 w-1 bg-[#00E5FF]" />
                <div>
                  <h3 className={`font-semibold ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
                    Market-Specific Pricing
                  </h3>
                  <p className={isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}>
                    Input current market prices for different grades to get accurate valuations
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-1 bg-[#00E5FF]" />
                <div>
                  <h3 className={`font-semibold ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
                    Grade Probability Assessment
                  </h3>
                  <p className={isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}>
                    Estimate likely grades based on card condition to make informed purchasing decisions
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-1 bg-[#00E5FF]" />
                <div>
                  <h3 className={`font-semibold ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
                    Fee Structure Analysis
                  </h3>
                  <p className={isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}>
                    Account for all associated costs including grading, shipping, and platform fees
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={`flex flex-col gap-4 p-6 rounded-lg ${
            isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
          } border`}>
            <h3 className={`text-xl font-semibold ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
              Make Better Buying Decisions
            </h3>
            <p className={isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}>
              Don't overpay for raw cards. Our calculator helps you:
            </p>
            <ul className={`space-y-2 ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
              <li>• Determine maximum purchase prices for profitable grading</li>
              <li>• Evaluate risk vs. reward for different card conditions</li>
              <li>• Compare potential ROI across different purchase options</li>
              <li>• Identify the most profitable selling strategy</li>
            </ul>
            <Link
              to="/calculator"
              className={`mt-4 px-4 py-2 rounded-md flex items-center justify-center ${
                isDark ? 'bg-[#334155] text-[#F1F5F9]' : 'bg-[#1E293B] text-[#F1F5F9]'
              } hover:bg-[#00E5FF] hover:text-[#1E293B] transition-colors`}
            >
              Start Analyzing <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="container mx-auto px-4 py-16">
        <div className={`flex flex-col gap-8 rounded-xl border ${
          isDark ? 'bg-[#1E293B]/40 border-[#334155]' : 'bg-[#F8FAFC] border-[#E2E8F0]'
        } p-8`}>
          <div className="flex flex-col gap-4 text-center">
            <h2 className={`text-3xl font-bold ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
              See It In Action
            </h2>
            <p className={isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}>
              Our calculator provides detailed breakdowns of expected values and recommends the best selling method
            </p>
          </div>
          <div className={`aspect-[16/9] overflow-hidden rounded-lg border ${
            isDark ? 'bg-[#1E293B] border-[#334155]' : 'bg-white border-[#E2E8F0]'
          }`}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-r1PNvtW6BKl2XlV5fV5sjz1oLA6X27.png"
              alt="Card Value Calculator Interface"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Sell to Us Section */}
      <section className={`container mx-auto px-4 py-16 ${isDark ? 'bg-[#1E293B]/40' : 'bg-[#F8FAFC]'}`}>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <h2 className={`text-3xl font-bold ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
              Prefer a Quick Sale?
            </h2>
            <p className={isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}>
              Don't want to deal with the hassle of grading and selling? We offer competitive prices for your cards.
            </p>
            <ul className="space-y-2">
              <li className={`flex items-center gap-2 ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
                <Banknote className="h-5 w-5 text-[#00E5FF]" />
                <span>Get a quote within 24 hours</span>
              </li>
              <li className={`flex items-center gap-2 ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
                <Banknote className="h-5 w-5 text-[#00E5FF]" />
                <span>Free shipping on collections valued over $1000</span>
              </li>
              <li className={`flex items-center gap-2 ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
                <Banknote className="h-5 w-5 text-[#00E5FF]" />
                <span>Payment sent within 3 business days of receipt</span>
              </li>
            </ul>
            <Link
              to="/quote"
              className={`inline-flex items-center px-4 py-2 rounded-md ${
                isDark ? 'bg-[#334155] text-[#F1F5F9]' : 'bg-[#F8FAFC] text-[#1E293B] border border-[#E2E8F0]'
              } hover:bg-[#00E5FF] hover:text-[#1E293B] transition-colors`}
            >
              Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <Card className={`w-full max-w-md ${isDark ? 'bg-[#1E293B] border-[#334155]' : ''}`}>
              <CardContent className="flex flex-col items-center gap-4 p-6">
                <Banknote className="h-12 w-12 text-[#00E5FF]" />
                <h3 className={`text-xl font-semibold ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
                  Sell Your Cards to Us
                </h3>
                <p className={`text-center ${isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                  Skip the calculations and get a fair offer for your cards directly from our team of experts.
                </p>
                <Link
                  to="/quote"
                  className={`w-full px-4 py-2 rounded-md flex items-center justify-center ${
                    isDark ? 'bg-[#334155] text-[#F1F5F9]' : 'bg-[#1E293B] text-[#F1F5F9]'
                  } hover:bg-[#00E5FF] hover:text-[#1E293B] transition-colors`}
                >
                  Start Selling
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`mt-auto flex flex-col items-center gap-8 ${
        isDark ? 'bg-[#1E293B]/40' : 'bg-[#F8FAFC]'
      } px-4 py-16 text-center`}>
        <div className="flex flex-col gap-4">
          <h2 className={`text-3xl font-bold ${isDark ? 'text-[#F1F5F9]' : 'text-[#1E293B]'}`}>
            Ready to Maximize Your Card Value?
          </h2>
          <p className={isDark ? 'text-[#94A3B8]' : 'text-[#64748B]'}>
            Whether you want to calculate potential profits or get a quick offer, we've got you covered.
          </p>
        </div>
        <div className="flex flex-col gap-4 min-[400px]:flex-row">
          <Link
            to="/calculator"
            className={`px-4 py-2 rounded-md flex items-center justify-center ${
              isDark ? 'bg-[#334155] text-[#F1F5F9]' : 'bg-[#1E293B] text-[#F1F5F9]'
            } hover:bg-[#00E5FF] hover:text-[#1E293B] transition-colors`}
          >
            Try Calculator <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            to="/quote"
            className={`px-4 py-2 rounded-md flex items-center justify-center ${
              isDark ? 'bg-[#1E293B] text-[#F1F5F9]' : 'bg-white text-[#1E293B]'
            } border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors`}
          >
            Sell to Us
          </Link>
        </div>
      </section>
    </div>
  );
}
