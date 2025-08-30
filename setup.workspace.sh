#!/bin/sh
app raxon/node object import -class=System.Route -url=/Application/Mount/Domain/Admin.Workspace.Com/Data/System.Route.json
app raxon/node object import -class=System.Route -url=/Application/Mount/Domain/Api.Workspace.Com/Data/System.Route.json
app install raxon/account -patch
app install raxon/doctrine -patch
app raxon/doctrine 