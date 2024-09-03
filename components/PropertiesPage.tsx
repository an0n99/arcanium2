"use client"

import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function PropertiesPage() {
  const [properties, setProperties] = useState([
    { id: 'P001', title: "Modern Apartment", price: "$250,000", beds: 2, baths: 2, sqft: 1000, address: "123 Main St, City, State", description: "A beautiful modern apartment in the heart of the city." },
    { id: 'P002', title: "Luxury Villa", price: "$1,200,000", beds: 5, baths: 4, sqft: 4000, address: "456 Ocean Ave, Beach City, State", description: "Stunning luxury villa with ocean views." },
  ])

  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isListingFormOpen, setIsListingFormOpen] = useState(false)
  const [newProperty, setNewProperty] = useState({
    title: '', price: '', beds: '', baths: '', sqft: '', address: '', description: ''
  })

  const handleListProperty = (e) => {
    e.preventDefault()
    const id = `P${String(properties.length + 1).padStart(3, '0')}`
    setProperties([...properties, { ...newProperty, id }])
    setIsListingFormOpen(false)
    setNewProperty({ title: '', price: '', beds: '', baths: '', sqft: '', address: '', description: '' })
  }

  return (
    <div>
      <section className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Find Your Dream Home</h2>
        <p className="text-xl text-white opacity-80 mb-8">Discover the perfect property in your ideal location</p>
        <Button onClick={() => setIsListingFormOpen(true)}>List a Property</Button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden rounded-xl transition-transform duration-300 hover:scale-105">
            <CardContent className="p-0">
              <img
                src={`https://picsum.photos/seed/${property.id}/300/200`}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{property.title}</h3>
              <p className="text-2xl font-bold mb-2 text-purple-600 dark:text-purple-400">{property.price}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{property.address}</p>
              <div className="flex justify-between w-full text-sm text-gray-600 dark:text-gray-300 mb-4">
                <span>{property.beds} beds</span>
                <span>{property.baths} baths</span>
                <span>{property.sqft} sqft</span>
              </div>
              <Button onClick={() => setSelectedProperty(property)}>More Info</Button>
            </CardFooter>
          </Card>
        ))}
      </section>

      <Dialog open={selectedProperty !== null} onOpenChange={() => setSelectedProperty(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProperty?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-lg font-semibold mb-2">{selectedProperty?.price}</p>
            <p className="text-sm text-gray-600 mb-4">{selectedProperty?.address}</p>
            <p className="mb-4">{selectedProperty?.description}</p>
            <div className="flex justify-between mb-4">
              <span>{selectedProperty?.beds} beds</span>
              <span>{selectedProperty?.baths} baths</span>
              <span>{selectedProperty?.sqft} sqft</span>
            </div>
            <div className="flex justify-between">
              <Button onClick={() => {/* Implement Buy Now form */}}>Buy Now</Button>
              <Button onClick={() => {/* Implement Make an Offer form */}}>Make an Offer</Button>
              <Button onClick={() => {/* Implement Book a Viewing form */}}>Book a Viewing</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isListingFormOpen} onOpenChange={setIsListingFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>List a Property</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleListProperty} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={newProperty.title} onChange={(e) => setNewProperty({...newProperty, title: e.target.value})} required />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" value={newProperty.price} onChange={(e) => setNewProperty({...newProperty, price: e.target.value})} required />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={newProperty.address} onChange={(e) => setNewProperty({...newProperty, address: e.target.value})} required />
            </div>
            <div>
              <Label htmlFor="beds">Bedrooms</Label>
              <Input id="beds" type="number" value={newProperty.beds} onChange={(e) => setNewProperty({...newProperty, beds: e.target.value})} required />
            </div>
            <div>
              <Label htmlFor="baths">Bathrooms</Label>
              <Input id="baths" type="number" value={newProperty.baths} onChange={(e) => setNewProperty({...newProperty, baths: e.target.value})} required />
            </div>
            <div>
              <Label htmlFor="sqft">Square Footage</Label>
              <Input id="sqft" type="number" value={newProperty.sqft} onChange={(e) => setNewProperty({...newProperty, sqft: e.target.value})} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={newProperty.description} onChange={(e) => setNewProperty({...newProperty, description: e.target.value})} required />
            </div>
            <Button type="submit">List Property</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}