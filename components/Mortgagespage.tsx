"use client"

import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function MortgagesPage() {
  const [mortgages, setMortgages] = useState([
    { id: 'M001', provider: "Bank A", maxAmount: "$500,000", term: 30, interestRate: 3.5, totalCollateral: 80, initialCollateral: 20, walletAddress: "0x1234...5678" },
    { id: 'M002', provider: "Bank B", maxAmount: "$750,000", term: 25, interestRate: 3.2, totalCollateral: 85, initialCollateral: 15, walletAddress: "0xABCD...EFGH" },
  ])

  const [selectedMortgage, setSelectedMortgage] = useState(null)
  const [isListingFormOpen, setIsListingFormOpen] = useState(false)
  const [newMortgage, setNewMortgage] = useState({
    provider: '', maxAmount: '', term: '', interestRate: '', totalCollateral: '', initialCollateral: '', walletAddress: ''
  })

  const handleListMortgage = (e) => {
    e.preventDefault()
    const id = `M${String(mortgages.length + 1).padStart(3, '0')}`
    setMortgages([...mortgages, { ...newMortgage, id }])
    setIsListingFormOpen(false)
    setNewMortgage({ provider: '', maxAmount: '', term: '', interestRate: '', totalCollateral: '', initialCollateral: '', walletAddress: '' })
  }

  return (
    <div>
      <section className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Find the Perfect Mortgage</h2>
        <p className="text-xl text-white opacity-80 mb-8">Discover competitive mortgage offers from trusted providers</p>
        <Button onClick={() => setIsListingFormOpen(true)}>List a Mortgage Offer</Button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mortgages.map((mortgage) => (
          <Card key={mortgage.id} className="overflow-hidden rounded-xl transition-transform duration-300 hover:scale-105">
            <CardContent className="p-4 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{mortgage.provider}</h3>
              <p className="text-2xl font-bold mb-2 text-purple-600 dark:text-purple-400">{mortgage.maxAmount}</p>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <p>Term: {mortgage.term} years</p>
                <p>Interest Rate: {mortgage.interestRate}%</p>
                <p>Total Collateral: {mortgage.totalCollateral}%</p>
                <p>Initial Collateral: {mortgage.initialCollateral}%</p>
              </div>
            </CardContent>
            <CardFooter className="bg-white dark:bg-gray-800 p-4">
              <Button onClick={() => setSelectedMortgage(mortgage)}>More Info</Button>
            </CardFooter>
          </Card>
        ))}
      </section>

      <Dialog open={selectedMortgage !== null} onOpenChange={() => setSelectedMortgage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedMortgage?.provider}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-lg font-semibold mb-2">Max Amount: {selectedMortgage?.maxAmount}</p>
            <p className="mb-1">Term: {selectedMortgage?.term} years</p>
            <p className="mb-1">Interest Rate: {selectedMortgage?.interestRate}%</p>
            <p className="mb-1">Total Collateral: {selectedMortgage?.totalCollateral}%</p>
            <p className="mb-1">Initial Collateral: {selectedMortgage?.initialCollateral}%</p>
            <p className="mb-4">Wallet Address: {selectedMortgage?.walletAddress}</p>
            <div className="flex justify-between">
              <Button onClick={() => {/* Implement Make an Offer form */}}>Make an Offer</Button>
              <Button onClick={() => {/* Implement Contact form */}}>Contact</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isListingFormOpen} onOpenChange={setIsListingFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>List a Mortgage Offer</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleListMortgage} className="space-y-4">
            <div>
              <Label htmlFor="provider">Provider Name</Label>
              <Input id="provider" value={newMortgage.provider} onChange={(e) => setNewMortgage({...newMortgage, provider: e.target.value})} required />
            </div>
            <div>
              <Label htmlFor="maxAmount">Maximum Amount</Label>
              <Input id="maxAmount" value={newMortgage.maxAmount} onChange={(e) => setNewMortgage({...newMortgage, maxAmount: e.target.value})} required />
            </div>
            <div>
              <Label htmlFor="term">Term (years)</Label>
              <Input id="term" type="number" value={newMortgage.term} onChange={(e) => setNewMortgage({...newMortgage, term: e.target.value})} required />
            </div>
            <div>
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input id="interestRate" type="number" step="0.1" value={newMortgage.interestRate} onChange={(e) => setNewMortgage({...newMortgage, interestRate: e.target.value})} required />
            </div>
            <div>
              <Label htmlFor="totalCollateral">Total Collateral (%)</Label>
              <Input id="totalCollateral" type="number" value={newMortgage.totalCollateral} onChange={(e) => setNewMortgage({...newMortgage, totalCollateral: e.target.value})} required />
            </div>
            <div>
              <Label htmlFor="initialCollateral">Initial Collateral (%)</Label>
              <Input id="initialCollateral" type="number" value={newMortgage.initialCollateral} onChange={(e) => setNewMortgage({...newMortgage, initialCollateral: e.target.value})} required />
            </div>
            <div>
              <Label htmlFor="walletAddress">Wallet Address</Label>
              <Input id="walletAddress" value={newMortgage.walletAddress} onChange={(e) => setNewMortgage({...newMortgage, walletAddress: e.target.value})} required />
            </div>
            <Button type="submit">List Mortgage Offer</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}