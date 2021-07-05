1. Create hardlink from 
`mklink /D "generator\node_modules" "node_modules"`
`mklink "generator\node_modules\package.json" "node_modules\package.json"`
`mklink "generator\node_modules\package-lock.json" "node_modules\package-lock.json"`

1. Generate Templates
`cd generator`
`ag.cmd ../asyncapi.yml template --output ../dst --install --force-write`