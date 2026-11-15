import { runSourcePlugin } from '@codot/plugin-sdk'
import manifest from '../manifest.json' with { type: 'json' }
import { jiraProvider } from './jira-provider.js'

runSourcePlugin({ manifest, sources: [jiraProvider()] })
