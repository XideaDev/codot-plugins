import { runSourcePlugin } from '@codot/plugin-sdk'
import manifest from '../manifest.json' with { type: 'json' }
import { githubProvider } from './github-provider.js'

runSourcePlugin({ manifest, sources: [githubProvider()] })
