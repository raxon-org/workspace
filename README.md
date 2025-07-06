# workspace

app raxon/host system create -domain=workspace.com
app raxon/host system create -domain=admin.workspace.com
app raxon/host system create -domain=api.workspace.com
app raxon/basic apache2 site create -server.admin=info@workspace.com -server.name=workspace.com -development -server.alias[]=admin.workspace.com -server.alias[]=api.workspace.com
app raxon/basic apache2 site enable -server.name=workspace.local
app raxon/basic apache2 restart