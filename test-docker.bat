
docker run -d --name water-test -p 3000:3000 
  -e NODE_ENV=production 
  -e NITRO_PRESET=node 
  -e NITRO_HOST=0.0.0.0 
  -e HOST=0.0.0.0 
  -e PORT=3000 
  water-dashboard:test
