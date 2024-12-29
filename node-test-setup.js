// Mock browser specific APIs

global.document = {
  getElementById: () => ({ addEventListener: () => {} })
}
