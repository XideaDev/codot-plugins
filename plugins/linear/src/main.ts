import { runSourcePlugin } from '@codot/plugin-sdk'
import manifest from '../manifest.json' with { type: 'json' }
import { linearSource } from './linear-source.js'

runSourcePlugin({ manifest, sources: [linearSource()] })
