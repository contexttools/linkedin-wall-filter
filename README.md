# linkedin-wall-filter
Filter wall by tags, words, phrase

It's possible on different ways:
+ by SaaS using API
+ by plugin
  + uBlock + [config file](ublock.txt)
  + feed filter

[firefox plugin](https://extensionworkshop.com/documentation/publish/submitting-an-add-on/#self-distribution)


![filter](screen/filter1.png)


## uBlock

+ [adfilt/Wiki/SyntaxMeaningsThatAreActuallyHumanReadable.md at master · DandelionSprout/adfilt](https://github.com/DandelionSprout/adfilt/blob/master/Wiki/SyntaxMeaningsThatAreActuallyHumanReadable.md)



## testing

[Getting started with web-ext | Firefox Extension Workshop](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/)

tool install
```bash
npm install --global web-ext
```
npm install -g web-ext


> ### Testing out an extension
>
> Test an extension in Firefox by `cd`'ing into your extensions’s root directory and entering:
```bash
web-ext run
```


## Packaging extension

Once you've tested your extension and verified that it's working, you can turn it into a package for submitting to addons.mozilla.org using the following command:

```bash
web-ext build --overwrite-dest 
```

##  publish

https://support.mozilla.org/pl/kb/zabezpiecz-konto-mozilli-dwuetapowe-uwierzytelnienie

https://addons.mozilla.org/en-US/developers/


https://extensionworkshop.com/documentation/manage/updating-your-extension/

https://extensionworkshop.com/documentation/publish/submitting-an-add-on/#self-distribution

[Signing and distribution overview - Firefox Extension Workshop](https://extensionworkshop.com/documentation/publish/signing-and-distribution-overview/)
