import requests
import json

domain_url = 'https://raw.githubusercontent.com/lappis-unb/tais/master/coach/domain.yml'
stories_url = 'https://api.github.com/repos/lappis-unb/tais/contents/coach/data/stories'
intents_url = 'https://api.github.com/repos/lappis-unb/tais/contents/coach/data/intents'

domain = ''
stories = []
intents = []

r = requests.get(domain_url)
domain = r.text

r = requests.get(intents_url)

intents_files = json.loads(r.text)

for f in intents_files:
    r = requests.get('https://raw.githubusercontent.com/lappis-unb/tais/master/' + f['path'])
    intents.append(r.text)

stories_files = json.loads(r.text)

for f in stories_files:
    r = requests.get('https://raw.githubusercontent.com/lappis-unb/tais/master/' + f['path'])
    stories.append(r.text)
