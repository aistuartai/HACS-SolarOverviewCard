function t(t,e,i,o){var r,s=arguments.length,a=s<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(a=(s<3?r(a):s>3?r(e,i,a):r(e,i))||a);return s>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),r=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new s(i,t,o)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,v=globalThis,g=v.trustedTypes,f=g?g.emptyScript:"",y=v.reactiveElementPolyfillSupport,_=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&d(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const s=o?.call(this);r?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),r=e.litNonce;void 0!==r&&o.setAttribute("nonce",r),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:m).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=o;const s=r.fromAttribute(e,t.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(t,e,i,o=!1,r){if(void 0!==t){const s=this.constructor;if(!1===o&&(r=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??b)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:r},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==r||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[_("elementProperties")]=new Map,w[_("finalized")]=new Map,y?.({ReactiveElement:w}),(v.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=t=>t,k=x.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,H="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,M=`<${C}>`,P=document,T=()=>P.createComment(""),V=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,D="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,U=/>/g,R=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,B=/"/g,I=/^(?:script|style|textarea|title)$/i,j=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),q=j(1),G=j(2),W=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),F=new WeakMap,J=P.createTreeWalker(P,129);function K(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,o=[];let r,s=2===e?"<svg>":3===e?"<math>":"",a=N;for(let e=0;e<i;e++){const i=t[e];let n,l,d=-1,c=0;for(;c<i.length&&(a.lastIndex=c,l=a.exec(i),null!==l);)c=a.lastIndex,a===N?"!--"===l[1]?a=O:void 0!==l[1]?a=U:void 0!==l[2]?(I.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=R):void 0!==l[3]&&(a=R):a===R?">"===l[0]?(a=r??N,d=-1):void 0===l[1]?d=-2:(d=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?R:'"'===l[3]?B:z):a===B||a===z?a=R:a===O||a===U?a=N:(a=R,r=void 0);const h=a===R&&t[e+1].startsWith("/>")?" ":"";s+=a===N?i+M:d>=0?(o.push(n),i.slice(0,d)+H+i.slice(d)+E+h):i+E+(-2===d?e:h)}return[K(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Q{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,s=0;const a=t.length-1,n=this.parts,[l,d]=Y(t,e);if(this.el=Q.createElement(l,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=J.nextNode())&&n.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(H)){const e=d[s++],i=o.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?ot:"?"===a[1]?rt:"@"===a[1]?st:it}),o.removeAttribute(t)}else t.startsWith(E)&&(n.push({type:6,index:r}),o.removeAttribute(t));if(I.test(o.tagName)){const t=o.textContent.split(E),e=t.length-1;if(e>0){o.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],T()),J.nextNode(),n.push({type:2,index:++r});o.append(t[e],T())}}}else if(8===o.nodeType)if(o.data===C)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(E,t+1));)n.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,o){if(e===W)return e;let r=void 0!==o?i._$Co?.[o]:i._$Cl;const s=V(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(t),r._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=r:i._$Cl=r),void 0!==r&&(e=X(t,r._$AS(t,e.values),r,o)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??P).importNode(e,!0);J.currentNode=o;let r=J.nextNode(),s=0,a=0,n=i[0];for(;void 0!==n;){if(s===n.index){let e;2===n.type?e=new et(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new at(r,this,t)),this._$AV.push(e),n=i[++a]}s!==n?.index&&(r=J.nextNode(),s++)}return J.currentNode=P,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),V(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&V(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new tt(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new Q(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const r of t)o===e.length?e.push(i=new et(this.O(T()),this.O(T()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,r){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Z}_$AI(t,e=this,i,o){const r=this.strings;let s=!1;if(void 0===r)t=X(this,t,e,0),s=!V(t)||t!==this._$AH&&t!==W,s&&(this._$AH=t);else{const o=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=X(this,o[i+a],e,a),n===W&&(n=this._$AH[a]),s||=!V(n)||n!==this._$AH[a],n===Z?t=Z:t!==Z&&(t+=(n??"")+r[a+1]),this._$AH[a]=n}s&&!o&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}}class rt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}}class st extends it{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??Z)===W)return;const i=this._$AH,o=t===Z&&i!==Z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==Z&&(i===Z||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(Q,et),(x.litHtmlVersions??=[]).push("3.3.2");const lt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class dt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let r=o._$litPart$;if(void 0===r){const t=i?.renderBefore??null;o._$litPart$=r=new et(e.insertBefore(T(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}dt._$litElement$=!0,dt.finalized=!0,lt.litElementHydrateSupport?.({LitElement:dt});const ct=lt.litElementPolyfillSupport;ct?.({LitElement:dt}),(lt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:b},ut=(t=pt,e,i)=>{const{kind:o,metadata:r}=i;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,r,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const r=this[o];e.call(this,i),this.requestUpdate(o,r,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function vt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function gt(t){return vt({...t,state:!0,attribute:!1})}const ft=a`
  /* ─── Colour tokens ───────────────────────────────────────────── */
  :host {
    --color-solar:   #f59e0b;
    --color-battery: #10b981;
    --color-grid:    #8b5cf6;
    --color-home:    #3b82f6;

    --color-solar-bg:   rgba(245, 158, 11,  0.12);
    --color-battery-bg: rgba(16,  185, 129, 0.12);
    --color-grid-bg:    rgba(139, 92,  246, 0.12);
    --color-home-bg:    rgba(59,  130, 246, 0.12);

    /* Fallbacks when HA CSS vars are absent (unit-tests / preview) */
    --card-background-color: #1c1c1e;
    --primary-text-color: #e5e7eb;
    --secondary-text-color: #9ca3af;
    --primary-color: #3b82f6;
    --ha-card-border-radius: 12px;
    --ha-card-box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
  }

  /* ─── Light theme overrides ───────────────────────────────────── */
  :host([theme='light']),
  :host([data-theme='light']) {
    --card-background-color: #ffffff;
    --primary-text-color: #111827;
    --secondary-text-color: #6b7280;
    --ha-card-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }

  @media (prefers-color-scheme: light) {
    :host([theme='auto']) {
      --card-background-color: #ffffff;
      --primary-text-color: #111827;
      --secondary-text-color: #6b7280;
      --ha-card-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    }
  }

  /* ─── Card shell ──────────────────────────────────────────────── */
  .card {
    background: var(--card-background-color);
    border-radius: var(--ha-card-border-radius, 12px);
    box-shadow: var(--ha-card-box-shadow);
    padding: 16px;
    color: var(--primary-text-color);
    font-family: var(--paper-font-body1_-_font-family, 'Roboto', sans-serif);
    overflow: hidden;
    box-sizing: border-box;
  }

  /* ─── Card header ─────────────────────────────────────────────── */
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .card-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary-text-color);
    margin: 0;
  }

  .card-subtitle {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
  }

  /* ─── Flow diagram container ──────────────────────────────────── */
  .flow-diagram {
    width: 100%;
    margin: 0 auto 16px;
    display: block;
    overflow: visible;
  }

  .flow-diagram svg {
    width: 100%;
    height: auto;
    display: block;
  }

  /* ─── 2×2 stat grid ───────────────────────────────────────────── */
  .stat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 12px;
  }

  @media (max-width: 400px) {
    .stat-grid {
      grid-template-columns: 1fr;
    }
  }

  /* ─── Individual stat panel ───────────────────────────────────── */
  .stat-panel {
    background: color-mix(in srgb, var(--card-background-color) 85%, transparent);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 10px;
    padding: 12px 14px 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;
    overflow: hidden;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .stat-panel:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  }

  .stat-panel-header {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .stat-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .stat-name {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .stat-value {
    font-size: 1.45rem;
    font-weight: 700;
    line-height: 1.1;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
  }

  .stat-unit {
    font-size: 0.85rem;
    font-weight: 400;
    color: var(--secondary-text-color);
  }

  .stat-badge {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 99px;
    width: fit-content;
  }

  .stat-sparkline {
    width: 100%;
    height: 48px;
    margin-top: 4px;
    border-radius: 4px;
    display: block;
  }

  /* Color accents per source */
  .panel--solar   { border-top: 2px solid var(--color-solar);   }
  .panel--battery { border-top: 2px solid var(--color-battery); }
  .panel--grid    { border-top: 2px solid var(--color-grid);    }
  .panel--home    { border-top: 2px solid var(--color-home);    }

  .badge--solar   { background: var(--color-solar-bg);   color: var(--color-solar);   }
  .badge--battery { background: var(--color-battery-bg); color: var(--color-battery); }
  .badge--grid    { background: var(--color-grid-bg);    color: var(--color-grid);    }
  .badge--home    { background: var(--color-home-bg);    color: var(--color-home);    }

  /* ─── Devices row ─────────────────────────────────────────────── */
  .devices-section {
    margin-top: 4px;
  }

  .devices-label {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 6px;
  }

  .devices-row {
    display: flex;
    flex-direction: row;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.15) transparent;
  }

  .devices-row::-webkit-scrollbar {
    height: 3px;
  }

  .devices-row::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.2);
    border-radius: 2px;
  }

  /* ─── Device chip ─────────────────────────────────────────────── */
  .device-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 99px;
    padding: 4px 10px 4px 7px;
    white-space: nowrap;
    flex-shrink: 0;
    transition: opacity 0.2s;
  }

  .device-chip.dim {
    opacity: 0.4;
  }

  .device-chip svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    color: var(--secondary-text-color);
  }

  .chip-name {
    font-size: 0.72rem;
    color: var(--secondary-text-color);
  }

  .chip-value {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
  }

  /* ─── SVG flow animation ──────────────────────────────────────── */
  @keyframes flow-anim {
    to {
      stroke-dashoffset: -20;
    }
  }

  @keyframes flow-anim-reverse {
    to {
      stroke-dashoffset: 20;
    }
  }

  .flow-line-active {
    animation: flow-anim 0.8s linear infinite;
  }

  .flow-line-active-reverse {
    animation: flow-anim-reverse 0.8s linear infinite;
  }

  .flow-line-inactive {
    opacity: 0.12;
  }

  /* ─── No-config / error state ─────────────────────────────────── */
  .error-card {
    padding: 16px;
    color: #ef4444;
    font-size: 0.875rem;
    border-left: 3px solid #ef4444;
  }
`;function yt(t,e){return Math.abs(t)>=e?`${(t/1e3).toFixed(1)} kW`:`${Math.round(t)} W`}function _t(t){if(null==t)return 0;const e="number"==typeof t?t:parseFloat(t);return isNaN(e)?0:e}function mt(t,e){const i=t.toLowerCase();return i.includes("solar")||i.includes("pv")?e>0?"Generating":"Idle":i.includes("battery")||i.includes("batt")?e>0?"Charging":e<0?"Discharging":"Idle":i.includes("grid")?e>0?"Importing":e<0?"Exporting":"Idle":i.includes("load")||i.includes("home")||i.includes("consumption")?e>0?"Consuming":"Idle":e>0?"Active":"Idle"}const bt=300,$t=150,wt=150,xt=$t,At=wt,kt=250,St=wt,Ht=$t,Et=250,Ct=32;let Mt=class extends dt{constructor(){super(...arguments),this.solar=0,this.battery=0,this.grid=0,this.load=0,this.socPercent=0,this.wattThreshold=1e3,this.flows={solarToHome:0,solarToBattery:0,solarToGrid:0,gridToHome:0,batteryToHome:0,gridToBattery:0}}_batteryColor(){const t=Math.max(0,Math.min(100,this.socPercent));let e,i,o;if(t>=50){const r=(t-50)/50;e=Math.round(16+229*r),i=Math.round(185+-27*r),o=Math.round(129+-118*r)}else{const r=t/50;e=Math.round(239+6*r),i=Math.round(68+90*r),o=Math.round(68+-57*r)}return`rgb(${e},${i},${o})`}_lineWidth(t){const e=Math.abs(t);return e<=0?2:Math.min(8,Math.max(2,e/1e3*4+2))}_trim(t,e,i,o,r=36){const s=i-t,a=o-e,n=Math.sqrt(s*s+a*a),l=s/n,d=a/n;return{x1:t+l*r,y1:e+d*r,x2:i-l*r,y2:o-d*r}}_flowLine(t,e,i,o,r,s,a=!1){const n=r>1,{x1:l,y1:d,x2:c,y2:h}=this._trim(t,e,i,o),p=this._lineWidth(r),u=n?function(t,e){if(e<=0)return 1;const i=Math.abs(t)/e;return Math.min(1,Math.max(.2,i))}(r,5e3):1;return G`
      <line
        x1="${l}" y1="${d}" x2="${c}" y2="${h}"
        stroke="${s}"
        stroke-width="${p}"
        stroke-linecap="round"
        stroke-dasharray="${n?"8 6":"4 6"}"
        stroke-dashoffset="0"
        opacity="${n?u:.13}"
        class="${n?a?"flow-active-rev":"flow-active":""}"
      />
    `}_node(t,e,i,o,r,s,a){const n=yt(r,this.wattThreshold);return G`
      <g class="node">
        <circle cx="${t}" cy="${e}" r="${Ct}"
          fill="${a}" stroke="${s}" stroke-width="2" />
        <g transform="translate(${t-18}, ${e-18}) scale(${1.5})">
          <path d="${i}" fill="${s}" />
        </g>
        <text x="${t}" y="${e+Ct+14}" text-anchor="middle"
          font-size="10" font-family="Roboto, sans-serif"
          fill="var(--secondary-text-color, #9ca3af)">${o}</text>
        <text x="${t}" y="${e+Ct+26}" text-anchor="middle"
          font-size="11" font-weight="700" font-family="Roboto, sans-serif"
          fill="var(--primary-text-color, #e5e7eb)">${n}</text>
      </g>
    `}_socRing(){const t=2*Math.PI*37,e=this.socPercent/100*t,i=t-e,o=this._batteryColor();return G`
      <circle
        cx="${Ht}" cy="${Et}" r="${37}"
        fill="none"
        stroke="${o}"
        stroke-width="3"
        stroke-dasharray="${e} ${i}"
        stroke-dashoffset="0"
        transform="rotate(-90 ${Ht} ${Et})"
        opacity="0.85"
        stroke-linecap="round"
      />
      <text
        x="${Ht}" y="${320}"
        text-anchor="middle" font-size="9" font-family="Roboto, sans-serif"
        fill="${o}" font-weight="600"
      >${this.socPercent.toFixed(0)}%</text>
    `}render(){const t=this.flows,e=this._batteryColor(),i=`${e.replace("rgb(","rgba(").replace(")",", 0.15)")}`;return q`
      <svg
        viewBox="0 0 ${bt} ${320}"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Solar power flow diagram"
        role="img"
        style="width:100%;height:auto;display:block;"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <!-- Solar → Home -->
        ${this._flowLine(xt,50,kt,St,t.solarToHome,"#f59e0b")}
        <!-- Solar → Battery -->
        ${this._flowLine(xt,50,Ht,Et,t.solarToBattery,"#f59e0b")}
        <!-- Solar → Grid (export) — no reverse, animation goes solar→grid -->
        ${this._flowLine(xt,50,50,At,t.solarToGrid,"#f59e0b")}
        <!-- Grid → Home (import) -->
        ${this._flowLine(50,At,kt,St,t.gridToHome,"#8b5cf6")}
        <!-- Battery → Home (discharge) -->
        ${this._flowLine(Ht,Et,kt,St,t.batteryToHome,e)}
        <!-- Grid → Battery (grid charging) -->
        ${this._flowLine(50,At,Ht,Et,t.gridToBattery,"#8b5cf6")}

        ${this._socRing()}

        ${this._node(xt,50,"M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M4,4V20H20V4H4M5,5H11V11H5V5M13,5H19V11H13V5M5,13H11V19H5V13M13,13H19V19H13V13Z","Solar",this.solar,"#f59e0b","rgba(245,158,11,0.15)")}
        ${this._node(50,At,"M11.5,3.5L10.5,6H13.5L12.5,3.5H11.5M10,7L8.5,10H15.5L14,7H10M8,11L5,17H8L9,14H15L16,17H19L16,11H8M8,18L11,21H13L16,18H8Z","Grid",this.grid,"#8b5cf6","rgba(139,92,246,0.15)")}
        ${this._node(kt,St,"M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z","Home",this.load,"#3b82f6","rgba(59,130,246,0.15)")}
        ${this._node(Ht,Et,"M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z","Battery",this.battery,e,i)}
      </svg>
    `}updated(t){super.updated(t)}};Mt.styles=a`
    :host { display: block; }
    @keyframes flow-anim     { to { stroke-dashoffset: -20; } }
    @keyframes flow-anim-rev { to { stroke-dashoffset:  20; } }
    .flow-active     { animation: flow-anim     0.8s linear infinite; }
    .flow-active-rev { animation: flow-anim-rev 0.8s linear infinite; }
  `,t([vt({type:Number})],Mt.prototype,"solar",void 0),t([vt({type:Number})],Mt.prototype,"battery",void 0),t([vt({type:Number})],Mt.prototype,"grid",void 0),t([vt({type:Number})],Mt.prototype,"load",void 0),t([vt({type:Number})],Mt.prototype,"socPercent",void 0),t([vt({type:Number})],Mt.prototype,"wattThreshold",void 0),t([vt({type:Object})],Mt.prototype,"flows",void 0),Mt=t([ht("flow-diagram")],Mt);let Pt=class extends dt{constructor(){super(...arguments),this.entityId="",this.name="",this.icon="",this.value=0,this.unit="W",this.stateLabel="",this.stateColor="#3b82f6",this.panelClass="",this.badgeClass="",this.showSparkline=!0,this.sparklineHistory=[],this.displayValue="",this._canvasReady=!1}updated(t){super.updated(t),this.showSparkline&&t.has("sparklineHistory")&&this._drawSparkline(),t.has("showSparkline")&&this.showSparkline&&(this._canvasReady=!0,this.requestUpdate(),this.updateComplete.then(()=>this._drawSparkline()))}_drawSparkline(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("canvas");if(!e)return;const i=this.sparklineHistory;if(!i||i.length<2)return;const o=window.devicePixelRatio||1,r=e.getBoundingClientRect(),s=r.width||200,a=r.height||48;e.width=s*o,e.height=a*o;const n=e.getContext("2d");if(!n)return;n.scale(o,o),n.clearRect(0,0,s,a);const l=i.slice(-60),d=l.map(t=>t.value),c=Math.min(...d),h=Math.max(...d)-c||1,p=t=>t/(l.length-1)*s,u=t=>a-4-(t-c)/h*(a-8),v=n.createLinearGradient(0,0,0,a);v.addColorStop(0,this.stateColor+"55"),v.addColorStop(1,this.stateColor+"00"),n.beginPath(),n.moveTo(p(0),a),l.forEach((t,e)=>n.lineTo(p(e),u(t.value))),n.lineTo(p(l.length-1),a),n.closePath(),n.fillStyle=v,n.fill(),n.beginPath(),n.strokeStyle=this.stateColor,n.lineWidth=1.5,n.lineJoin="round",n.lineCap="round",l.forEach((t,e)=>{0===e?n.moveTo(p(e),u(t.value)):n.lineTo(p(e),u(t.value))}),n.stroke()}render(){const t=this.displayValue||`${Math.round(Math.abs(this.value))} W`;return q`
      <div class="panel ${this.panelClass}">
        <div class="header">
          <div class="icon-wrap">
            <svg viewBox="0 0 24 24" fill="${this.stateColor}">
              <path d="${this.icon}" />
            </svg>
          </div>
          <span class="name">${this.name}</span>
        </div>

        <div class="value-row">
          <span class="value">${t}</span>
        </div>

        <span
          class="badge ${this.badgeClass}"
          style="background:${this.stateColor}22; color:${this.stateColor};"
        >${this.stateLabel}</span>

        ${this.showSparkline?q`<canvas aria-hidden="true"></canvas>`:""}
      </div>
    `}};Pt.styles=a`
    :host { display: block; }

    .panel {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 10px;
      padding: 12px 14px 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      overflow: hidden;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .icon-wrap {
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .icon-wrap svg {
      width: 20px;
      height: 20px;
    }

    .name {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--secondary-text-color, #9ca3af);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .value-row {
      display: flex;
      align-items: baseline;
      gap: 3px;
    }

    .value {
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1.1;
      color: var(--primary-text-color, #e5e7eb);
      font-variant-numeric: tabular-nums;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      font-size: 0.68rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 99px;
      width: fit-content;
      margin-top: 2px;
    }

    canvas {
      width: 100%;
      height: 48px;
      margin-top: 6px;
      border-radius: 4px;
      display: block;
    }
  `,t([vt({type:String})],Pt.prototype,"entityId",void 0),t([vt({type:String})],Pt.prototype,"name",void 0),t([vt({type:String})],Pt.prototype,"icon",void 0),t([vt({type:Number})],Pt.prototype,"value",void 0),t([vt({type:String})],Pt.prototype,"unit",void 0),t([vt({type:String})],Pt.prototype,"stateLabel",void 0),t([vt({type:String})],Pt.prototype,"stateColor",void 0),t([vt({type:String})],Pt.prototype,"panelClass",void 0),t([vt({type:String})],Pt.prototype,"badgeClass",void 0),t([vt({type:Boolean})],Pt.prototype,"showSparkline",void 0),t([vt({type:Array})],Pt.prototype,"sparklineHistory",void 0),t([vt({type:String})],Pt.prototype,"displayValue",void 0),t([gt()],Pt.prototype,"_canvasReady",void 0),Pt=t([ht("stat-panel")],Pt);let Tt=class extends dt{constructor(){super(...arguments),this.devices=[],this.wattThreshold=1e3,this._defaultIconPath="M7,2V13H10V22L17,10H13L17,2H7Z"}render(){if(!this.devices||0===this.devices.length)return q`<div class="row"><span class="empty">No devices configured</span></div>`;const t=[...this.devices].sort((t,e)=>e.watts-t.watts);return q`
      <div class="row" role="list" aria-label="Device power consumption">
        ${t.map(t=>{var e;return q`
            <div
              class="chip ${t.watts<5?"dim":""}"
              role="listitem"
              title="${t.name}: ${yt(t.watts,this.wattThreshold)}"
              style="${t.color?`border-color: ${t.color}33;`:""}"
            >
              ${(null===(e=t.icon)||void 0===e?void 0:e.startsWith("mdi:"))?q`<ha-icon icon="${t.icon}" style="${t.color?`color:${t.color};`:""}"></ha-icon>`:q`<svg viewBox="0 0 24 24" aria-hidden="true"
                    style="${t.color?`fill:${t.color};`:""}">
                    <path d="${t.icon||this._defaultIconPath}" />
                  </svg>`}
              <span class="chip-name">${t.name}</span>
              <span class="chip-value">${yt(t.watts,this.wattThreshold)}</span>
            </div>
          `})}
      </div>
    `}};Tt.styles=a`
    :host { display: block; }

    .row {
      display: flex;
      flex-direction: row;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 2px;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.15) transparent;
    }

    .row::-webkit-scrollbar {
      height: 3px;
    }
    .row::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.18);
      border-radius: 2px;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 99px;
      padding: 4px 10px 4px 7px;
      white-space: nowrap;
      flex-shrink: 0;
      cursor: default;
      transition: opacity 0.2s, background 0.15s;
    }

    .chip:hover {
      background: rgba(255,255,255,0.09);
    }

    .chip.dim {
      opacity: 0.38;
    }

    .chip svg {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      fill: var(--secondary-text-color, #9ca3af);
    }

    .chip ha-icon {
      --mdc-icon-size: 14px;
      flex-shrink: 0;
    }

    .chip-name {
      font-size: 0.72rem;
      color: var(--secondary-text-color, #9ca3af);
    }

    .chip-value {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--primary-text-color, #e5e7eb);
      font-variant-numeric: tabular-nums;
    }

    .empty {
      font-size: 0.75rem;
      color: var(--secondary-text-color, #9ca3af);
      font-style: italic;
    }
  `,t([vt({type:Array})],Tt.prototype,"devices",void 0),t([vt({type:Number})],Tt.prototype,"wattThreshold",void 0),Tt=t([ht("device-row")],Tt);let Vt=class extends dt{constructor(){super(...arguments),this._solar=0,this._battery=0,this._grid=0,this._load=0,this._soc=0,this._solarExport=0,this._gridToBattery=0,this._flows={solarToHome:0,solarToBattery:0,solarToGrid:0,gridToHome:0,batteryToHome:0,gridToBattery:0},this._sparklines={},this._error=null,this._lastSparklineFetch=0,this._sparklineDebounceMs=3e5}get hass(){return this._hass}static getStubConfig(){return{solar:{entity:"sensor.solar_power"},battery:{entity:"sensor.battery_power",soc_entity:"sensor.battery_soc"},grid:{entity:"sensor.grid_power"},load:{entity:"sensor.load_power"}}}static getConfigElement(){return document.createElement("solar-overview-card-editor")}setConfig(t){var e,i,o,r;if(!(null===(e=t.solar)||void 0===e?void 0:e.entity))throw new Error('solar-overview-card: "solar.entity" required');if(!(null===(i=t.battery)||void 0===i?void 0:i.entity))throw new Error('solar-overview-card: "battery.entity" required');if(!(null===(o=t.grid)||void 0===o?void 0:o.entity))throw new Error('solar-overview-card: "grid.entity" required');if(!(null===(r=t.load)||void 0===r?void 0:r.entity))throw new Error('solar-overview-card: "load.entity" required');this._config={watt_threshold:1e3,show_sparklines:!0,theme:"auto",show_flow:!0,show_stats:!0,show_devices:!0,...t},this._error=null}getCardSize(){return 4}set hass(t){var e,i,o,r,s,a;if(this._hass=t,this._config)try{const t=this._readEntity(this._config.solar.entity),n=this._readEntity(this._config.battery.entity),l=this._readEntity(this._config.grid.entity),d=this._readEntity(this._config.load.entity);this._solar=this._config.solar.invert?-t:t,this._battery=this._config.battery.invert?-n:n,this._grid=this._config.grid.invert?-l:l,this._load=this._config.load.invert?-d:d,this._config.battery.soc_entity&&(this._soc=this._readEntity(this._config.battery.soc_entity)),this._solarExport=this._config.solar.export_entity?this._readEntity(this._config.solar.export_entity):0,this._gridToBattery=this._config.battery.grid_charge_entity?this._readEntity(this._config.battery.grid_charge_entity):0,this._flows=(e=this._solar,i=this._battery,o=this._grid,r=this._load,s=this._config.solar.export_entity?this._solarExport:void 0,a=this._config.battery.grid_charge_entity?this._gridToBattery:void 0,{solarToHome:e>0?Math.min(e,r):0,solarToBattery:i>0&&e>0?Math.min(i,e):0,solarToGrid:void 0!==s?Math.max(0,s):o<0?Math.abs(o):0,gridToHome:o>0?o:0,batteryToHome:i<0?Math.abs(i):0,gridToBattery:void 0!==a?Math.max(0,a):0});const c=Date.now();!1!==this._config.show_sparklines&&c-this._lastSparklineFetch>this._sparklineDebounceMs&&(this._lastSparklineFetch=c,this._fetchSparklines())}catch(t){this._error=t.message}}_readEntity(t){var e;if(!(null===(e=this._hass)||void 0===e?void 0:e.states))return 0;const i=this._hass.states[t];return i?_t(i.state):0}async _fetchSparklines(){var t;if(!this._config||!(null===(t=this._hass)||void 0===t?void 0:t.callApi))return;const e=[this._config.solar.entity,this._config.battery.entity,this._config.grid.entity,this._config.load.entity],i=new Date,o=new Date(i.getTime()-72e5).toISOString(),r={};await Promise.allSettled(e.map(async t=>{try{const e=`history/period/${o}?filter_entity_id=${t}&minimal_response=true&no_attributes=true`,i=await this._hass.callApi("GET",e);if(!Array.isArray(i)||0===i.length)return;r[t]=i[0].map(t=>{const e=_t(t.state);return isNaN(e)?null:{time:new Date(t.last_updated).getTime(),value:e}}).filter(t=>null!==t)}catch{}})),this._sparklines={...this._sparklines,...r}}_threshold(){var t,e;return null!==(e=null===(t=this._config)||void 0===t?void 0:t.watt_threshold)&&void 0!==e?e:1e3}_deviceItems(){var t,e;return(null===(t=this._config)||void 0===t?void 0:t.devices)&&(null===(e=this._hass)||void 0===e?void 0:e.states)?this._config.devices.map(t=>{var e,i;return{entityId:t.entity,name:null!==(e=t.name)&&void 0!==e?e:t.entity,icon:null!==(i=t.icon)&&void 0!==i?i:"M7,2V13H10V22L17,10H13L17,2H7Z",watts:this._readEntity(t.entity),color:t.color}}):[]}_panelProps(t,e,i,o,r,s){var a,n,l;const d=this._threshold(),c=this._config[t];return{entityId:s,name:null!==(a=null==c?void 0:c.name)&&void 0!==a?a:i,icon:o,value:e,displayValue:yt(e,d),stateLabel:mt(s,e),stateColor:r,showSparkline:!1!==(null===(n=this._config)||void 0===n?void 0:n.show_sparklines),sparklineHistory:null!==(l=this._sparklines[s])&&void 0!==l?l:[],panelClass:`panel--${t}`,badgeClass:`badge--${t}`}}render(){var t;if(!this._config)return q`<ha-card><div class="error-card">solar-overview-card: no config.</div></ha-card>`;if(this._error)return q`<ha-card><div class="error-card">Error: ${this._error}</div></ha-card>`;const e=this._threshold(),i=!1!==this._config.show_flow,o=!1!==this._config.show_stats,r=!1!==this._config.show_devices,s=this._panelProps("solar",this._solar,"Solar","M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M4,4V20H20V4H4M5,5H11V11H5V5M13,5H19V11H13V5M5,13H11V19H5V13M13,13H19V19H13V13Z","#f59e0b",this._config.solar.entity),a=this._panelProps("battery",this._battery,"Battery","M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z","#10b981",this._config.battery.entity),n=this._panelProps("grid",this._grid,"Grid","M11.5,3.5L10.5,6H13.5L12.5,3.5H11.5M10,7L8.5,10H15.5L14,7H10M8,11L5,17H8L9,14H15L16,17H19L16,11H8M8,18L11,21H13L16,18H8Z","#8b5cf6",this._config.grid.entity),l=this._panelProps("load",this._load,"Home","M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z","#3b82f6",this._config.load.entity),d=this._deviceItems();return q`
      <ha-card>
        <div class="card" theme="${null!==(t=this._config.theme)&&void 0!==t?t:"auto"}">

          ${i?q`
            <div class="flow-diagram">
              <flow-diagram
                .solar="${this._solar}"
                .battery="${this._battery}"
                .grid="${this._grid}"
                .load="${this._load}"
                .socPercent="${this._soc}"
                .wattThreshold="${e}"
                .flows="${this._flows}"
              ></flow-diagram>
            </div>
          `:""}

          ${o?q`
            <div class="stat-grid">
              ${["solar","battery","grid","load"].map(t=>{const e={solar:s,battery:a,grid:n,load:l}[t];return q`
                  <stat-panel
                    .entityId="${e.entityId}"
                    .name="${e.name}"
                    .icon="${e.icon}"
                    .value="${e.value}"
                    .displayValue="${e.displayValue}"
                    .stateLabel="${e.stateLabel}"
                    .stateColor="${e.stateColor}"
                    .showSparkline="${e.showSparkline}"
                    .sparklineHistory="${e.sparklineHistory}"
                    .panelClass="${e.panelClass}"
                    .badgeClass="${e.badgeClass}"
                  ></stat-panel>
                `})}
            </div>
          `:""}

          ${r&&this._config.devices&&this._config.devices.length>0?q`
            <div class="devices-section">
              <div class="devices-label">Devices</div>
              <device-row
                .devices="${d}"
                .wattThreshold="${e}"
              ></device-row>
            </div>
          `:""}

        </div>
      </ha-card>
    `}updated(t){super.updated(t)}};Vt.styles=[ft,a`:host { display: block; } ha-card { overflow: hidden; }`],t([gt()],Vt.prototype,"_config",void 0),t([gt()],Vt.prototype,"_solar",void 0),t([gt()],Vt.prototype,"_battery",void 0),t([gt()],Vt.prototype,"_grid",void 0),t([gt()],Vt.prototype,"_load",void 0),t([gt()],Vt.prototype,"_soc",void 0),t([gt()],Vt.prototype,"_solarExport",void 0),t([gt()],Vt.prototype,"_gridToBattery",void 0),t([gt()],Vt.prototype,"_flows",void 0),t([gt()],Vt.prototype,"_sparklines",void 0),t([gt()],Vt.prototype,"_error",void 0),Vt=t([ht("solar-overview-card")],Vt);let Lt=class extends dt{constructor(){super(...arguments),this._newDevice={entity:"",name:"",icon:"mdi:power-socket",color:"#6366f1"}}setConfig(t){this._config=t}_setValue(t,e){var i;if(!this._config)return;const o=t.split("."),r=JSON.parse(JSON.stringify(this._config)),s=r;if(2===o.length){const[t,r]=o,a=null!==(i=s[t])&&void 0!==i?i:{};a[r]=e,s[t]=a}else s[o[0]]=e;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:r}}))}_entityPicker(t,e,i){return q`
      <ha-selector
        .hass="${this.hass}"
        .label="${t}"
        .selector=${{entity:{}}}
        .value="${i||""}"
        @value-changed="${t=>{var i;return this._setValue(e,null!==(i=t.detail.value)&&void 0!==i?i:"")}}"
      ></ha-selector>
    `}_deleteDevice(t){var e;if(!this._config)return;const i=[...null!==(e=this._config.devices)&&void 0!==e?e:[]];i.splice(t,1),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config,devices:i}}}))}_addDevice(){var t;if(!this._config||!this._newDevice.entity)return;const e=[...null!==(t=this._config.devices)&&void 0!==t?t:[],{...this._newDevice}];this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config,devices:e}}})),this._newDevice={entity:"",name:"",icon:"mdi:power-socket",color:"#6366f1"}}_renderDeviceEditor(){var t,e;const i=null!==(e=null===(t=this._config)||void 0===t?void 0:t.devices)&&void 0!==e?e:[];return q`
      <div class="section-title">Devices</div>

      ${i.length>0?q`
        <div class="device-list">
          ${i.map((t,e)=>{var i,o;return q`
            <div class="device-item">
              <div class="device-item-color" style="background:${null!==(i=t.color)&&void 0!==i?i:"#6366f1"}"></div>
              <div style="flex:1;min-width:0;">
                <div class="device-item-name">${null!==(o=t.name)&&void 0!==o?o:t.entity}</div>
                <div class="device-item-entity">${t.entity}</div>
              </div>
              <button class="device-delete" @click="${()=>this._deleteDevice(e)}" title="Remove">✕</button>
            </div>
          `})}
        </div>
      `:""}

      <div class="add-device-form">
        <ha-selector
          .hass="${this.hass}"
          .label="Entity"
          .selector=${{entity:{}}}
          .value="${this._newDevice.entity}"
          @value-changed="${t=>{var e;this._newDevice={...this._newDevice,entity:null!==(e=t.detail.value)&&void 0!==e?e:""},this.requestUpdate()}}"
        ></ha-selector>

        <div class="add-device-row">
          <ha-selector
            .label="Name"
            .selector=${{text:{}}}
            .value="${this._newDevice.name}"
            @value-changed="${t=>{var e;this._newDevice={...this._newDevice,name:null!==(e=t.detail.value)&&void 0!==e?e:""},this.requestUpdate()}}"
          ></ha-selector>

          <ha-selector
            .label="Icon"
            .selector=${{icon:{}}}
            .value="${this._newDevice.icon}"
            @value-changed="${t=>{var e;this._newDevice={...this._newDevice,icon:null!==(e=t.detail.value)&&void 0!==e?e:""},this.requestUpdate()}}"
          ></ha-selector>
        </div>

        <div class="color-row">
          <label>Colour</label>
          <input type="color" .value="${this._newDevice.color}"
            @input="${t=>{this._newDevice={...this._newDevice,color:t.target.value},this.requestUpdate()}}"
          />
        </div>

        <button class="add-btn" ?disabled="${!this._newDevice.entity}"
          @click="${this._addDevice}">
          Add Device
        </button>
      </div>
    `}_toggle(t,e,i){return q`
      <ha-selector
        .label="${t}"
        .selector=${{boolean:{}}}
        .value="${i}"
        @value-changed="${t=>this._setValue(e,t.detail.value)}"
      ></ha-selector>
    `}render(){var t,e,i,o,r,s,a,n,l,d,c,h,p,u,v,g,f,y;if(!this._config)return q``;const _=this._config;return q`
      <div class="row">
        <div class="section-title">Required entities</div>
        ${this._entityPicker("Solar power","solar.entity",null!==(e=null===(t=_.solar)||void 0===t?void 0:t.entity)&&void 0!==e?e:"")}
        ${this._entityPicker("Battery power","battery.entity",null!==(o=null===(i=_.battery)||void 0===i?void 0:i.entity)&&void 0!==o?o:"")}
        ${this._entityPicker("Battery SOC (%)","battery.soc_entity",null!==(s=null===(r=_.battery)||void 0===r?void 0:r.soc_entity)&&void 0!==s?s:"")}
        ${this._entityPicker("Grid power","grid.entity",null!==(n=null===(a=_.grid)||void 0===a?void 0:a.entity)&&void 0!==n?n:"")}
        ${this._entityPicker("Home load","load.entity",null!==(d=null===(l=_.load)||void 0===l?void 0:l.entity)&&void 0!==d?d:"")}

        <div class="section-title">Optional entities</div>
        ${this._entityPicker("Solar export to grid","solar.export_entity",null!==(h=null===(c=_.solar)||void 0===c?void 0:c.export_entity)&&void 0!==h?h:"")}
        ${this._entityPicker("Grid charging battery","battery.grid_charge_entity",null!==(u=null===(p=_.battery)||void 0===p?void 0:p.grid_charge_entity)&&void 0!==u?u:"")}

        ${this._renderDeviceEditor()}

        <div class="section-title">Sign conventions</div>
        ${this._toggle("Invert battery (positive = discharging)","battery.invert",null!==(g=null===(v=_.battery)||void 0===v?void 0:v.invert)&&void 0!==g&&g)}
        ${this._toggle("Invert grid (positive = exporting)","grid.invert",null!==(y=null===(f=_.grid)||void 0===f?void 0:f.invert)&&void 0!==y&&y)}

        <div class="section-title">Visibility</div>
        ${this._toggle("Show flow diagram","show_flow",!1!==_.show_flow)}
        ${this._toggle("Show stat panels","show_stats",!1!==_.show_stats)}
        ${this._toggle("Show devices row","show_devices",!1!==_.show_devices)}
        ${this._toggle("Show sparklines","show_sparklines",!1!==_.show_sparklines)}

        <p class="hint">Sign convention (default): battery positive = charging, grid positive = importing.</p>
      </div>
    `}};Lt.styles=a`
    :host { display: block; padding: 16px; }
    .row { display: flex; flex-direction: column; gap: 12px; }
    .section-title {
      font-size: 0.8rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.06em; color: var(--secondary-text-color, #9ca3af);
      margin: 8px 0 4px;
    }
    .hint { font-size: 0.75rem; color: var(--secondary-text-color, #9ca3af); margin-top: 4px; }
    .device-list { display: flex; flex-direction: column; gap: 6px; }
    .device-item {
      display: flex; align-items: center; gap: 8px;
      background: rgba(255,255,255,0.04); border-radius: 8px; padding: 8px 10px;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .device-item-color { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
    .device-item-name { flex: 1; font-size: 0.85rem; }
    .device-item-entity { font-size: 0.72rem; color: var(--secondary-text-color, #9ca3af); }
    .device-delete {
      background: none; border: none; cursor: pointer; padding: 4px;
      color: var(--secondary-text-color, #9ca3af); border-radius: 4px;
      font-size: 1rem; line-height: 1;
    }
    .device-delete:hover { color: #ef4444; }
    .add-device-form {
      display: flex; flex-direction: column; gap: 8px;
      background: rgba(255,255,255,0.03); border-radius: 8px; padding: 12px;
      border: 1px dashed rgba(255,255,255,0.12);
    }
    .add-device-row { display: flex; gap: 8px; align-items: center; }
    .add-device-row ha-selector { flex: 1; }
    .color-row { display: flex; align-items: center; gap: 10px; }
    .color-row label { font-size: 0.8rem; color: var(--secondary-text-color, #9ca3af); }
    .color-row input[type=color] {
      width: 36px; height: 28px; border: none; border-radius: 4px;
      background: none; cursor: pointer; padding: 0;
    }
    .add-btn {
      background: var(--primary-color, #3b82f6); color: white; border: none;
      border-radius: 6px; padding: 8px 16px; cursor: pointer; font-size: 0.85rem;
      font-weight: 600; align-self: flex-end;
    }
    .add-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  `,t([vt({attribute:!1})],Lt.prototype,"hass",void 0),t([gt()],Lt.prototype,"_config",void 0),t([gt()],Lt.prototype,"_newDevice",void 0),Lt=t([ht("solar-overview-card-editor")],Lt),window.customCards=window.customCards||[],window.customCards.push({type:"solar-overview-card",name:"Solar Overview Card",description:"Animated solar energy overview with power flow diagram",preview:!0});export{Vt as SolarOverviewCard,Lt as SolarOverviewCardEditor};
