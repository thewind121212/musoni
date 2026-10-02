import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Vitest runs without globals, so Testing Library cannot register its own
// unmount hook; do it here for every test file.
afterEach(() => cleanup())
