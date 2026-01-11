
import React, { useState, useEffect, useRef } from 'react';
import { fetchGeocoding } from '../services/weatherService';
import { GeocodingResult } from '../types';

interface Props {
  onLocationSelect: (loc: GeocodingResult) => void;
}

const SearchInput: React.FC<Props> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.length > 2) {
        setIsLoading(true);
        const res = await fetchGeocoding(query);
        setResults(res);
        setIsLoading(false);
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto mb-8 z-50">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-3 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-slate-100 placeholder-slate-500 shadow-xl"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div ref={dropdownRef} className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          {results.map((res, i) => (
            <button
              key={`${res.name}-${res.country}-${i}`}
              onClick={() => {
                onLocationSelect(res);
                setQuery('');
                setResults([]);
              }}
              className="w-full text-left px-6 py-3 hover:bg-slate-700/50 transition-colors flex justify-between items-center group"
            >
              <div>
                <span className="font-medium text-slate-200 group-hover:text-cyan-400">{res.name}</span>
                <span className="ml-2 text-xs text-slate-500">{res.country}</span>
              </div>
              <svg className="w-4 h-4 text-slate-600 group-hover:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
