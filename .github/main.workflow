workflow "New workflow" {
  on = "push"
  resolves = ["deploy"]
}

action "deploy" {
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  args = "--public --no-clipboard deploy --name=super-pokedex public"
  secrets = ["ZEIT_TOKEN"]
}

action "alias" {
  needs = ["deploy"]
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  args = "alias"
  secrets = ["ZEIT_TOKEN"]
}
