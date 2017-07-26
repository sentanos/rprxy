# rprxy

Because ROBLOX does not allow HttpService requests to roblox.com an external proxy is needed for access to site APIs.
This will proxy all requests to ROBLOX via `server.js` except when the path is `/proxy` and a static file exists.

A limited number of APIs are available via the `/proxy/api` path via `api.js`.

## Installation

Simply clone the project and type `npm install` when in the folder to install all dependencies. You can now start the server with `node server.js`.

The default configuration does not have to be changed for a working server and it will automatically work with any subdomain your DNS supports.

## Configuration

The only configuration files you may want to edit are `blocked.json` and `re_blocked.json`.
All paths that match any in `blocked.json` _exactly_ will be blocked. If you want to match with regex, which can also be used for partial matching, add the pattern to `re_blocked.json`. If _anything matches at all_ the URL will be blocked.

There are a few settings you can change directly in the `server.js` file. If `serveHomepage` is `true` the rprxy home page will be at the root of the domain. If `serveHomepageOnAllSubdomains` is `true` this will apply to all subdomains, otherwise it will only apply to the root domain.

If you have your own domain point all the subdomains you need at the server and it will work automatically when you visit those subdomains on your own site.
If you are not able to add subdomains for any reason (usually if you just don't have a domain name) you can set `subdomainsAsPath` to `true` in the `server.js` file.
When this is enabled you can request a specific subdomain by using it first in the path (see the examples below).

## Examples
In every example the main domain is `rprxy.xyz`.

To search the catalog (search subdomain):  
[https://search.rprxy.xyz/catalog/json](#)

If you have `subdomainsAsPath` enabled:  
[https://rprxy.xyz/search/catalog/json](#)

Get recommended username (no subdomain):  
[https://rprxy.xyz/UserCheck/GetRecommendedUsername?usernameToTry=Froast]()

If you have `subdomainsAsPath` enabled:  
[https://rprxy.xyz/www/UserCheck/GetRecommendedUsername?usernameToTry=Froast]()

Having no subdomain is the same as having a www subdomain, below is exactly the same:  
[https://www.rprxy.xyz/UserCheck/GetRecommendedUsername?usernameToTry=Froast]()

If you have `subdomainsAsPath` enabled it doesn't matter what the actual subdomain is:  
[https://www.rprxy.xyz/www/UserCheck/GetRecommendedUsername?usernameToTry=Froast]()
