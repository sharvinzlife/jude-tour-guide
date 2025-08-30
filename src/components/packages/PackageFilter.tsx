'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { 
  Search, 
  SlidersHorizontal, 
  X,
  Filter,
  Grid,
  List,
  ArrowUpDown,
  Calendar,
  MapPin,
  Star,
  Clock,
  DollarSign,
  Users
} from 'lucide-react'

interface PackageFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  sortBy: string
  onSortChange: (sortBy: string) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  selectedDestinations: string[]
  onDestinationChange: (destinations: string[]) => void
  selectedDifficulty: string[]
  onDifficultyChange: (difficulty: string[]) => void
  layout: 'grid' | 'list'
  onLayoutChange: (layout: 'grid' | 'list') => void
  showFilters: boolean
  onToggleFilters: () => void
  totalPackages: number
  filteredPackages: number
}

const destinations = ['Kochi', 'Munnar', 'Thekkady', 'Alleppey', 'Kumarakom', 'Kovalam', 'Varkala', 'Poovar']
const difficulties = ['Easy', 'Moderate', 'Challenging']
const sortOptions = [
  { value: 'featured', label: 'Featured First', icon: Star },
  { value: 'price-low', label: 'Price: Low to High', icon: DollarSign },
  { value: 'price-high', label: 'Price: High to Low', icon: DollarSign },
  { value: 'rating', label: 'Highest Rated', icon: Star },
  { value: 'duration', label: 'Duration', icon: Clock },
  { value: 'popular', label: 'Most Popular', icon: Users }
]

export function PackageFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  selectedDestinations,
  onDestinationChange,
  selectedDifficulty,
  onDifficultyChange,
  layout,
  onLayoutChange,
  showFilters,
  onToggleFilters,
  totalPackages,
  filteredPackages
}: PackageFilterProps) {

  const handleDestinationToggle = (destination: string) => {
    const updated = selectedDestinations.includes(destination)
      ? selectedDestinations.filter(d => d !== destination)
      : [...selectedDestinations, destination]
    onDestinationChange(updated)
  }

  const handleDifficultyToggle = (difficulty: string) => {
    const updated = selectedDifficulty.includes(difficulty)
      ? selectedDifficulty.filter(d => d !== difficulty)
      : [...selectedDifficulty, difficulty]
    onDifficultyChange(updated)
  }

  const clearFilters = () => {
    onCategoryChange('All')
    onSearchChange('')
    onPriceRangeChange([0, 60000])
    onDestinationChange([])
    onDifficultyChange([])
    onSortChange('featured')
  }

  const hasActiveFilters = selectedCategory !== 'All' || 
                          searchQuery !== '' || 
                          priceRange[0] > 0 || 
                          priceRange[1] < 60000 ||
                          selectedDestinations.length > 0 ||
                          selectedDifficulty.length > 0

  return (
    <div className="space-y-6 mb-8">
      {/* Main Filter Bar */}
      <Card className="p-6 bg-white/80 backdrop-blur-xl border-0 shadow-lg rounded-2xl">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search tours, destinations, activities..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/50 backdrop-blur border-gray-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
                onClick={() => onSearchChange('')}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-4 h-4 text-gray-600" />
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-48 bg-white/50 backdrop-blur border-gray-200 rounded-full">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center space-x-2">
                      <option.icon className="w-4 h-4" />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Layout Toggle */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-full p-1">
            <Button
              variant={layout === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-full px-3"
              onClick={() => onLayoutChange('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={layout === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-full px-3"
              onClick={() => onLayoutChange('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Filters Toggle */}
          <Button
            variant="outline"
            className="rounded-full px-4 relative"
            onClick={onToggleFilters}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <Badge className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs px-2 py-1">
                {[
                  selectedCategory !== 'All' ? 1 : 0,
                  searchQuery ? 1 : 0,
                  priceRange[0] > 0 || priceRange[1] < 60000 ? 1 : 0,
                  selectedDestinations.length,
                  selectedDifficulty.length
                ].reduce((sum, count) => sum + count, 0)}
              </Badge>
            )}
          </Button>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-emerald-600">{filteredPackages}</span> of{' '}
            <span className="font-semibold">{totalPackages}</span> tour packages
          </p>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4 mr-1" />
              Clear all filters
            </Button>
          )}
        </div>
      </Card>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <Card className="p-6 bg-white/80 backdrop-blur-xl border-0 shadow-lg rounded-2xl animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Categories */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                Categories
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start text-left rounded-full"
                    onClick={() => onCategoryChange(category)}
                  >
                    {category}
                    {selectedCategory === category && (
                      <Badge className="ml-2 bg-white/20 text-xs">
                        Selected
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Destinations */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                Destinations
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {destinations.map((destination) => (
                  <Button
                    key={destination}
                    variant={selectedDestinations.includes(destination) ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start text-left rounded-full"
                    onClick={() => handleDestinationToggle(destination)}
                  >
                    {destination}
                    {selectedDestinations.includes(destination) && (
                      <Badge className="ml-2 bg-white/20 text-xs">
                        ✓
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Difficulty & Price */}
            <div className="space-y-6">
              {/* Difficulty */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <SlidersHorizontal className="w-4 h-4 mr-2 text-emerald-600" />
                  Difficulty
                </h4>
                <div className="space-y-2">
                  {difficulties.map((difficulty) => (
                    <Button
                      key={difficulty}
                      variant={selectedDifficulty.includes(difficulty) ? 'default' : 'outline'}
                      size="sm"
                      className={`w-full justify-start text-left rounded-full ${
                        difficulty === 'Easy' ? 'border-green-200' :
                        difficulty === 'Moderate' ? 'border-yellow-200' :
                        'border-red-200'
                      }`}
                      onClick={() => handleDifficultyToggle(difficulty)}
                    >
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        difficulty === 'Easy' ? 'bg-green-500' :
                        difficulty === 'Moderate' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} />
                      {difficulty}
                      {selectedDifficulty.includes(difficulty) && (
                        <Badge className="ml-2 bg-white/20 text-xs">
                          ✓
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-emerald-600" />
                Price Range
              </h4>
              <div className="space-y-4">
                <div className="px-3">
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => onPriceRangeChange(value as [number, number])}
                    max={60000}
                    min={0}
                    step={1000}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 px-3">
                  <span className="font-medium">₹{priceRange[0].toLocaleString()}</span>
                  <span className="text-gray-400">-</span>
                  <span className="font-medium">₹{priceRange[1].toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => onPriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="text-sm"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value) || 60000])}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Filter Tags */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Quick Filters</h4>
            <div className="flex flex-wrap gap-2">
              {['Honeymoon Special', 'Family Friendly', 'Adventure', 'Peaceful', 'Photography', 'Cultural'].map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition-colors"
                  onClick={() => onSearchChange(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
