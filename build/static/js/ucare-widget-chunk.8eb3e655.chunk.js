"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[923],{8467:function(e,n,r){r.r(n);var t=r(3771),u=r(2791),o=r(9540),a=r.n(o),l=r(6421),c=r(77),i=r.n(c);r(4947);var f=function(e,n){var r=e.id,o=e.name,a=e.value,c=e.onFileSelect,f=e.onChange,s=e.onDialogOpen,d=e.onDialogClose,C=e.onTabChange,A=e.apiRef,p=e.customTabs,L=e.validators,E=e.tabsCss,v=e.locale,g=e.localeTranslations,w=e.localePluralize,O=e.previewUrlCallback,R=(0,t.a)(e,["id","name","value","onFileSelect","onChange","onDialogOpen","onDialogClose","onTabChange","apiRef","customTabs","validators","tabsCss","locale","localeTranslations","localePluralize","previewUrlCallback"]),b=(0,u.useRef)(null),h=(0,u.useRef)(null),U=(0,l.u)(c),_=(0,l.u)(f),m=(0,l.u)(s),D=(0,l.u)(d),P=(0,l.u)(C);(0,l.a)(p,n);var T=function(e,n){var r=!0,t=(0,u.useRef)();t.current?r=!!(n&&t.current.deps&&i()(n,t.current.deps)):t.current={deps:n,result:e()};var o=r?t.current:{deps:n,result:e()};return t.current=o,o.result}((function(){return e=R,Object.entries(e).reduce((function(e,n){var r=(0,t.b)(n,2),u=r[0],o=r[1];return(0,t.c)((0,t.c)({},e),{},(0,t.d)({},"data-".concat(u.replace(/([a-zA-Z])(?=[A-Z])/g,"$1-").toLowerCase()),o))}),{});var e}),[R]);return(0,l.b)((function(){return v&&(window.UPLOADCARE_LOCALE=v),w&&(window.UPLOADCARE_LOCALE_PLURALIZE=w),g&&(window.UPLOADCARE_LOCALE_TRANSLATIONS=g),O&&(window.UPLOADCARE_PREVIEW_URL_CALLBACK=O),n.plugin((function(e){e.locale.rebuild({locale:v||null,localeTranslations:g||null,localePluralize:w||null})})),function(){v&&delete window.UPLOADCARE_LOCALE,w&&delete window.UPLOADCARE_LOCALE_PLURALIZE,g&&delete window.UPLOADCARE_LOCALE_TRANSLATIONS,O&&delete window.UPLOADCARE_PREVIEW_URL_CALLBACK}}),[v,g,w,O]),(0,u.useEffect)((function(){h.current=n.Widget(b.current);var e=b.current.nextSibling;return function(){return e&&e.parentNode.removeChild(e)}}),[n,T]),function(e,n){(0,u.useEffect)((function(){if(null!=n){var r=e.current;return n.forEach((function(e){r.validators.push(e)})),function(){r.validators.length=0}}}),[e,n])}(h,L),(0,u.useEffect)((function(){return h.current.onUploadComplete.add(_),h.current.onChange.add(U),function(){h.current.onUploadComplete.remove(_),h.current.onChange.remove(U)}}),[_,U,n,T]),(0,u.useEffect)((function(){var e,n=function(n){(e=n).done(D).fail(D).progress(P),m(n)};return h.current.onDialogOpen.add(n),function(){h.current.onDialogOpen.remove(n),e&&e.reject()}}),[T,D,m,P]),(0,u.useEffect)((function(){var e=[],n=function(n){e=n?n.files?n.files():[n]:[]};return h.current.onChange.add(n),function(){e.forEach((function(e){return e.cancel()})),h.current.onChange.remove(n)}}),[T]),(0,u.useEffect)((function(){h.current.value(a)}),[a]),(0,u.useEffect)((function(){n&&E&&"string"===typeof E&&(0===E.indexOf("https://")?n.tabsCss.addUrl(E):n.tabsCss.addStyle(E))}),[n,E]),(0,u.useImperativeHandle)(A,(function(){return{openDialog:function(){return h.current.openDialog()},reloadInfo:function(){return h.current.reloadInfo()},getInput:function(){return h.current.inputElement}}}),[]),(0,u.useCallback)((function(){return u.createElement("input",(0,t._)({type:"hidden",ref:b,id:r,name:o},T))}),[T,r,o])};n.default=function(e){var n=f(e,a());return u.createElement(n,null)}}}]);
//# sourceMappingURL=ucare-widget-chunk.8eb3e655.chunk.js.map