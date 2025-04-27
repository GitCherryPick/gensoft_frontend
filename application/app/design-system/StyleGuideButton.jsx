"use client"
import { useState } from "react"
import { Palette, Mail, Lock, Save, Play } from "lucide-react"
import PromiseButton from "@/components/core/PromiseButton"
import Button from "@/components/core/Button"

export default function StyleGuideButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")

  // Simulate an async operation
  const handleSave = async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Data saved!")
  }

  // Simulate a longer async operation
  const handleProcess = async () => {
    // Simulate longer API delay
    await new Promise((resolve) => setTimeout(resolve, 4000))
    console.log("Data processed!")
  }

  // Simulate a failing operation
  const handleError = async () => {
    // Simulate API delay then error
    await new Promise((resolve) => setTimeout(resolve, 1500))
    throw new Error("Something went wrong!")
  }

  return (
    <>
      {/* Style Guide Button - Fixed position */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-dark-2/80 hover:bg-dark-2 text-light-3 hover:text-light-1 p-2 rounded-full shadow-lg z-50 transition-colors"
        title="Open Style Guide"
      >
        <Palette size={20} />
      </button>

      {/* Style Guide Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-dark-1/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-dark-2 border border-neutral-700 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-dark-2 p-4 border-b border-neutral-700 flex justify-between items-center">
              <h2 className="text-xl font-medium text-light-1">Design System Guide</h2>
              <button onClick={() => setIsOpen(false)} className="text-light-3 hover:text-light-1 transition-colors">
                Close
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Colors Section */}
              <section>
                <h3 className="text-lg font-medium text-light-1 mb-4">Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <ColorSwatch name="dark-1" className="bg-dark-1" value="var(--color-dark-1)" hexValue="#0D0C11" />
                  <ColorSwatch name="dark-2" className="bg-dark-2" value="var(--color-dark-2)" hexValue="#131219" />
                  <ColorSwatch name="light-1" textClass="text-dark-1" value="var(--color-light-1)" hexValue="#FFFFFF" />
                  <ColorSwatch name="light-2" textClass="text-dark-1" value="var(--color-light-2)" hexValue="#B8B8BA" />
                  <ColorSwatch name="light-3" textClass="text-dark-1" value="var(--color-light-3)" hexValue="#77767D" />
                  <ColorSwatch name="cta-1" textClass="text-dark-1" value="var(--color-cta-1)" hexValue="#B0A1FF" />
                </div>
              </section>

              {/* Typography Section */}
              <section>
                <h3 className="text-lg font-medium text-light-1 mb-4">Typography</h3>
                <div className="space-y-6">
                  <TypographySample name="text-hero-primary" className="text-hero-primary">
                    Hero Primary Text
                  </TypographySample>
                  <TypographySample name="text-hero-secondary" className="text-hero-secondary">
                    Hero Secondary Text - Description text that explains the purpose of the section or provides
                    additional context.
                  </TypographySample>

                  <h4 className="text-md font-medium text-light-1 mt-8 mb-4">Text Variants</h4>
                  <TypographySample name="text-variant-1" className="text-variant-1">
                    Text Variant 1 - Larger text in white (#FFFFFF)
                  </TypographySample>
                  <TypographySample name="text-variant-2" className="text-variant-2">
                    Text Variant 2 - Medium weight text in light gray (#B8B8BA)
                  </TypographySample>
                  <TypographySample name="text-variant-3" className="text-variant-3">
                    Text Variant 3 - Normal weight text in medium gray (#77767D)
                  </TypographySample>
                </div>
              </section>

              {/* Core Components Section */}
              <section>
                <h3 className="text-lg font-medium text-light-1 mb-4">Core Components</h3>
                <div className="space-y-6">
                  <ComponentSample name="Input">
                    <div className="p-4 border border-neutral-700 rounded-md bg-dark-1">
                      <p className="text-sm text-light-3 mb-2">Import from: @/components/core/Input</p>
                      <div className="mb-4">
                        <Input
                          type="text"
                          placeholder="Regular input (placeholder uses text-variant-3)"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="bg-transparent border-neutral-700/50"
                        />
                        <p className="text-xs text-light-3 mt-1">Input text uses text-variant-1 (white)</p>
                      </div>
                      <div className="mb-4">
                        <Input
                          type="text"
                          placeholder="Input with icon"
                          icon={Mail}
                          className="bg-transparent border-neutral-700/50"
                        />
                      </div>
                      <div>
                        <Input
                          type="password"
                          placeholder="Password with visibility toggle"
                          value={passwordValue}
                          onChange={(e) => setPasswordValue(e.target.value)}
                          icon={Lock}
                          secure={true}
                          className="bg-transparent border-neutral-700/50"
                        />
                        <p className="text-xs text-light-3 mt-1">
                          Set <code className="bg-dark-2 px-1 rounded">secure=true</code> to add password toggle
                        </p>
                      </div>
                    </div>
                  </ComponentSample>

                  <ComponentSample name="Button">
                    <div className="p-4 border border-neutral-700 rounded-md bg-dark-1">
                      <p className="text-sm text-light-3 mb-2">Import from: @/components/core/Button</p>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <Button className="flex items-center gap-2">
                          <Save className="h-4 w-4" /> Save
                        </Button>

                        <Button variant="outline">Outline Button</Button>

                        <Button variant="ghost">Ghost Button</Button>

                        <Button variant="destructive">Destructive</Button>
                      </div>
                      <p className="text-xs text-light-3 mt-1">
                        Regular Button component with the same styling as PromiseButton
                      </p>
                    </div>
                  </ComponentSample>

                  <ComponentSample name="PromiseButton">
                    <div className="p-4 border border-neutral-700 rounded-md bg-dark-1">
                      <p className="text-sm text-light-3 mb-2">Import from: @/components/core/PromiseButton</p>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <PromiseButton onClick={handleSave} className="flex items-center gap-2">
                          <Save className="h-4 w-4" /> Save
                        </PromiseButton>

                        <PromiseButton onClick={handleProcess} variant="outline" loadingText="Processing...">
                          Process Data
                        </PromiseButton>

                        <PromiseButton onClick={handleError} variant="ghost">
                          Ghost Button
                        </PromiseButton>

                        <PromiseButton onClick={handleError} variant="destructive">
                          Error Example
                        </PromiseButton>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <Input
                          type="text"
                          placeholder="Input (h-12)"
                          className="bg-transparent border-neutral-700/50 w-48"
                        />
                        <PromiseButton onClick={handleSave}>Button (h-12)</PromiseButton>
                      </div>
                      <p className="text-xs text-light-3 mt-2">
                        PromiseButton matches input height (h-12) with larger text-base font and semibold weight
                      </p>
                    </div>
                  </ComponentSample>

                  <ComponentSample name="HeroActions Example">
                    <div className="p-4 border border-neutral-700 rounded-md bg-dark-1">
                      <p className="text-sm text-light-3 mb-2">Example from HeroActions component</p>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <Button>Comenzar Ahora</Button>

                        <button className="flex items-center justify-center text-light-1 px-4 py-2 rounded-md hover:text-light-2 transition-colors">
                          <Play className="h-5 w-5 mr-2" />
                          Ver introducción
                        </button>
                      </div>
                    </div>
                  </ComponentSample>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Helper Components
function ColorSwatch({ name, className, textClass = "text-light-1", value, hexValue }) {
  return (
    <div className="space-y-2">
      <div className={`h-16 rounded-md flex items-end p-2 relative overflow-hidden`} style={{ background: hexValue }}>
        {/* Border for better visibility */}
        <div className="absolute inset-0 border border-neutral-700 rounded-md"></div>
        <span className={`text-xs font-mono ${textClass} relative z-10`}>{name}</span>
      </div>
      <div className="text-xs text-light-3 font-mono">{value}</div>
      <div className="text-xs text-light-3 font-mono flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: hexValue, border: "1px solid rgba(255,255,255,0.2)" }}
        ></div>
        {hexValue}
      </div>
    </div>
  )
}

function TypographySample({ name, className, children }) {
  return (
    <div className="space-y-2 p-4 border border-neutral-700/30 rounded-md">
      <div className={className}>{children}</div>
      <div className="text-xs text-light-3 font-mono mt-4">{name}</div>
      <div className="text-xs text-light-3 font-mono">{`@layer components { .${name} { ... } }`}</div>
    </div>
  )
}

function ComponentSample({ name, children }) {
  return (
    <div className="space-y-2">
      <h4 className="text-md font-medium text-light-1">{name}</h4>
      {children}
    </div>
  )
}

// Import the Input component to showcase it
import Input from "@/components/core/Input"
