export const defaultYaml = `directories:
  inputs: knowledgearticles/inputs
  tika: knowledgearticles/tika
  text: knowledgearticles/text
  summary: knowledgearticles/summary

tika:
  type: jar
  jar: tika-app-2.9.2.jar

ai:
  type: openai
  url: https://api.openai.com
  model: gpt-3.5-turbo
  token: OPENAI_TOKEN

nonfunctionals:
  throttlingPerHour: 1000 # 1000 requests per hour
  concurrent: 100 # No more than 100 concurrent requests
  retry:
    initialInterval: 5000
    maximumInterval: 20000
    maximumAttempts: 10
    nonRecoverableErrors:
      - Not Found

schema: # The json returned has to match this schema
  type: inline
  value: true
report:
  categories: [ "description", "detection", "resolution", "validation", "summary" ]
  fields:
    value:
      type: enum
      enum: [ "Red", "Amber", "Green" ]
#    example:
#      type: number
prompt: |
  I want you to evaluate a Knowledge Article for an ITSM issue using the following four areas
  
  description: Do we have a clear description of what the issue is that this KEDB is about? Red/Orange/Green
  detection: Do we have a clear technical mechanism to determine that the issue exists. For example sql calls, api calls and so on
  and if we do, do we have enough information. For example with sql we need database connection details. For apis we need the urls
  resolution: Do we have a clear technical mechanism to resolve the issue. Same example issues (ie. sql needs conneciton issues)
  validation: Do we have a clear technical mechanism to validate that we have resolved the issue
  
  Note that traffic light colours are Red, Amber, Green

  The results will be used in RAG, so please provide a json object  with the name of the section (the description, detection, resolution and validation)
  each section is an object having two fields called 'value' and 'summary'. The first is  a  traffic light value, and the second a summary of why that value was chosen.
  In addition create a final object called 'summary' with the same two fields which score the whole based on the traffic light values, and give a summary about the quality of the KEDB entry.
  
  The knowledge article is
  {knowledgeArticle}
`