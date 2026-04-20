function t(t,e,i,s){var o,r=arguments.length,a=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(o=t[n])&&(a=(r<3?o(a):r>3?o(e,i,a):o(e,i))||a);return r>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:c,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,g=f.trustedTypes,y=g?g.emptyScript:"",v=f.reactiveElementPolyfillSupport,m=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...c(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const r=this.constructor;if(!1===s&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??$)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[m("elementProperties")]=new Map,w[m("finalized")]=new Map,v?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=t=>t,k=x.trustedTypes,H=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+C,M=`<${E}>`,P=document,T=()=>P.createComment(""),V=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,N="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,U=/>/g,z=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,D=/"/g,B=/^(?:script|style|textarea|title)$/i,j=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),q=j(1),G=j(2),W=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),F=new WeakMap,J=P.createTreeWalker(P,129);function K(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==H?H.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",a=O;for(let e=0;e<i;e++){const i=t[e];let n,l,d=-1,h=0;for(;h<i.length&&(a.lastIndex=h,l=a.exec(i),null!==l);)h=a.lastIndex,a===O?"!--"===l[1]?a=R:void 0!==l[1]?a=U:void 0!==l[2]?(B.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=z):void 0!==l[3]&&(a=z):a===z?">"===l[0]?(a=o??O,d=-1):void 0===l[1]?d=-2:(d=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?z:'"'===l[3]?D:I):a===D||a===I?a=z:a===R||a===U?a=O:(a=z,o=void 0);const c=a===z&&t[e+1].startsWith("/>")?" ":"";r+=a===O?i+M:d>=0?(s.push(n),i.slice(0,d)+S+i.slice(d)+C+c):i+C+(-2===d?e:c)}return[K(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const a=t.length-1,n=this.parts,[l,d]=Y(t,e);if(this.el=Q.createElement(l,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&n.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=d[r++],i=s.getAttribute(t).split(C),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?st:"?"===a[1]?ot:"@"===a[1]?rt:it}),s.removeAttribute(t)}else t.startsWith(C)&&(n.push({type:6,index:o}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),J.nextNode(),n.push({type:2,index:++o});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===E)n.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)n.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===W)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=V(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=X(t,o._$AS(t,e.values),o,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);J.currentNode=s;let o=J.nextNode(),r=0,a=0,n=i[0];for(;void 0!==n;){if(r===n.index){let e;2===n.type?e=new et(o,o.nextSibling,this,t):1===n.type?e=new n.ctor(o,n.name,n.strings,this,t):6===n.type&&(e=new at(o,this,t)),this._$AV.push(e),n=i[++a]}r!==n?.index&&(o=J.nextNode(),r++)}return J.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),V(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&V(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new Q(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new et(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Z}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=X(this,t,e,0),r=!V(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const s=t;let a,n;for(t=o[0],a=0;a<o.length-1;a++)n=X(this,s[i+a],e,a),n===W&&(n=this._$AH[a]),r||=!V(n)||n!==this._$AH[a],n===Z?t=Z:t!==Z&&(t+=(n??"")+o[a+1]),this._$AH[a]=n}r&&!s&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}}class ot extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}}class rt extends it{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??Z)===W)return;const i=this._$AH,s=t===Z&&i!==Z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==Z&&(i===Z||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(Q,et),(x.litHtmlVersions??=[]).push("3.3.2");const lt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class dt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new et(e.insertBefore(T(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}dt._$litElement$=!0,dt.finalized=!0,lt.litElementHydrateSupport?.({LitElement:dt});const ht=lt.litElementPolyfillSupport;ht?.({LitElement:dt}),(lt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:$},ut=(t=pt,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ft(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function gt(t){return ft({...t,state:!0,attribute:!1})}const yt=a`
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
    aspect-ratio: 1 / 1;
    max-height: 320px;
    margin: 0 auto 16px;
    display: block;
  }

  .flow-diagram svg {
    width: 100%;
    height: 100%;
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
`;function vt(t,e){return Math.abs(t)>=e?`${(t/1e3).toFixed(1)} kW`:`${Math.round(t)} W`}function mt(t){if(null==t)return 0;const e="number"==typeof t?t:parseFloat(t);return isNaN(e)?0:e}function _t(t,e){const i=t.toLowerCase();return i.includes("solar")||i.includes("pv")?e>0?"Generating":"Idle":i.includes("battery")||i.includes("batt")?e>0?"Charging":e<0?"Discharging":"Idle":i.includes("grid")?e>0?"Importing":e<0?"Exporting":"Idle":i.includes("load")||i.includes("home")||i.includes("consumption")?e>0?"Consuming":"Idle":e>0?"Active":"Idle"}const $t=300,bt=150,wt=150,xt=bt,At=wt,kt=250,Ht=wt,St=bt,Ct=250,Et=32;let Mt=class extends dt{constructor(){super(...arguments),this.solar=0,this.battery=0,this.grid=0,this.load=0,this.socPercent=0,this.wattThreshold=1e3,this.flows={solarToHome:0,solarToBattery:0,solarToGrid:0,gridToHome:0,batteryToHome:0}}_lineWidth(t){const e=Math.abs(t);return e<=0?2:Math.min(8,Math.max(2,e/1e3*4+2))}_trim(t,e,i,s,o=36){const r=i-t,a=s-e,n=Math.sqrt(r*r+a*a),l=r/n,d=a/n;return{x1:t+l*o,y1:e+d*o,x2:i-l*o,y2:s-d*o}}_flowLine(t,e,i,s,o,r,a=!1){const n=o>1,{x1:l,y1:d,x2:h,y2:c}=this._trim(t,e,i,s),p=this._lineWidth(o),u=n?function(t,e){if(e<=0)return 1;const i=Math.abs(t)/e;return Math.min(1,Math.max(.2,i))}(o,5e3):1;return G`
      <line
        x1="${l}" y1="${d}" x2="${h}" y2="${c}"
        stroke="${r}"
        stroke-width="${p}"
        stroke-linecap="round"
        stroke-dasharray="${n?"8 6":"4 6"}"
        stroke-dashoffset="0"
        opacity="${n?u:.13}"
        class="${n?a?"flow-active-rev":"flow-active":""}"
      />
    `}_node(t,e,i,s,o,r,a){const n=vt(o,this.wattThreshold);return G`
      <g class="node">
        <!-- background circle -->
        <circle cx="${t}" cy="${e}" r="${Et}"
          fill="${a}" stroke="${r}" stroke-width="2" />

        <!-- mdi icon centred in the circle -->
        <g transform="translate(${t-18}, ${e-18}) scale(${1.5})">
          <path d="${i}" fill="${r}" />
        </g>

        <!-- name label -->
        <text
          x="${t}" y="${e+Et+14}"
          text-anchor="middle"
          font-size="10"
          font-family="Roboto, sans-serif"
          fill="var(--secondary-text-color, #9ca3af)"
        >${s}</text>

        <!-- power value -->
        <text
          x="${t}" y="${e+Et+26}"
          text-anchor="middle"
          font-size="11"
          font-weight="700"
          font-family="Roboto, sans-serif"
          fill="var(--primary-text-color, #e5e7eb)"
        >${n}</text>
      </g>
    `}_socRing(){const t=2*Math.PI*37,e=this.socPercent/100*t,i=t-e,s=this.socPercent>60?"#10b981":this.socPercent>25?"#f59e0b":"#ef4444";return G`
      <circle
        cx="${St}" cy="${Ct}"
        r="${37}"
        fill="none"
        stroke="${s}"
        stroke-width="3"
        stroke-dasharray="${e} ${i}"
        stroke-dashoffset="0"
        transform="rotate(${-90} ${St} ${Ct})"
        opacity="0.85"
        stroke-linecap="round"
      />
      <!-- SOC % label -->
      <text
        x="${St}" y="${320}"
        text-anchor="middle"
        font-size="9"
        font-family="Roboto, sans-serif"
        fill="${s}"
        font-weight="600"
      >${this.socPercent.toFixed(0)}%</text>
    `}render(){const t=this.flows;return q`
      <svg
        viewBox="0 0 ${$t} ${320}"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Solar power flow diagram"
        role="img"
        style="width:100%;height:100%;display:block;"
      >
        <defs>
          <!-- Glow filter for active lines -->
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <!-- ── Flow lines (drawn before nodes so nodes sit on top) ── -->

        <!-- Solar → Home -->
        ${this._flowLine(xt,50,kt,Ht,t.solarToHome,"#f59e0b")}

        <!-- Solar → Battery -->
        ${this._flowLine(xt,50,St,Ct,t.solarToBattery,"#f59e0b")}

        <!-- Solar → Grid (export) -->
        ${this._flowLine(xt,50,50,At,t.solarToGrid,"#f59e0b",!0)}

        <!-- Grid → Home (import) -->
        ${this._flowLine(50,At,kt,Ht,t.gridToHome,"#8b5cf6")}

        <!-- Battery → Home (discharge) -->
        ${this._flowLine(St,Ct,kt,Ht,t.batteryToHome,"#10b981")}

        <!-- ── Battery SOC ring ── -->
        ${this._socRing()}

        <!-- ── Nodes ── -->
        ${this._node(xt,50,"M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M4,4V20H20V4H4M5,5H11V11H5V5M13,5H19V11H13V5M5,13H11V19H5V13M13,13H19V19H13V13Z","Solar",this.solar,"#f59e0b","rgba(245,158,11,0.15)")}

        ${this._node(50,At,"M11.5,3.5L10.5,6H13.5L12.5,3.5H11.5M10,7L8.5,10H15.5L14,7H10M8,11L5,17H8L9,14H15L16,17H19L16,11H8M8,18L11,21H13L16,18H8Z","Grid",this.grid,"#8b5cf6","rgba(139,92,246,0.15)")}

        ${this._node(kt,Ht,"M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z","Home",this.load,"#3b82f6","rgba(59,130,246,0.15)")}

        ${this._node(St,Ct,"M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z","Battery",this.battery,"#10b981","rgba(16,185,129,0.15)")}
      </svg>
    `}updated(t){super.updated(t)}};Mt.styles=a`
    :host { display: block; }

    @keyframes flow-anim {
      to { stroke-dashoffset: -20; }
    }
    @keyframes flow-anim-rev {
      to { stroke-dashoffset: 20; }
    }

    .flow-active {
      animation: flow-anim 0.8s linear infinite;
    }
    .flow-active-rev {
      animation: flow-anim-rev 0.8s linear infinite;
    }
  `,t([ft({type:Number})],Mt.prototype,"solar",void 0),t([ft({type:Number})],Mt.prototype,"battery",void 0),t([ft({type:Number})],Mt.prototype,"grid",void 0),t([ft({type:Number})],Mt.prototype,"load",void 0),t([ft({type:Number})],Mt.prototype,"socPercent",void 0),t([ft({type:Number})],Mt.prototype,"wattThreshold",void 0),t([ft({type:Object})],Mt.prototype,"flows",void 0),Mt=t([ct("flow-diagram")],Mt);let Pt=class extends dt{constructor(){super(...arguments),this.entityId="",this.name="",this.icon="",this.value=0,this.unit="W",this.stateLabel="",this.stateColor="#3b82f6",this.panelClass="",this.badgeClass="",this.showSparkline=!0,this.sparklineHistory=[],this.displayValue="",this._canvasReady=!1}updated(t){super.updated(t),this.showSparkline&&t.has("sparklineHistory")&&this._drawSparkline(),t.has("showSparkline")&&this.showSparkline&&(this._canvasReady=!0,this.requestUpdate(),this.updateComplete.then(()=>this._drawSparkline()))}_drawSparkline(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("canvas");if(!e)return;const i=this.sparklineHistory;if(!i||i.length<2)return;const s=window.devicePixelRatio||1,o=e.getBoundingClientRect(),r=o.width||200,a=o.height||48;e.width=r*s,e.height=a*s;const n=e.getContext("2d");if(!n)return;n.scale(s,s),n.clearRect(0,0,r,a);const l=i.slice(-60),d=l.map(t=>t.value),h=Math.min(...d),c=Math.max(...d)-h||1,p=t=>t/(l.length-1)*r,u=t=>a-4-(t-h)/c*(a-8),f=n.createLinearGradient(0,0,0,a);f.addColorStop(0,this.stateColor+"55"),f.addColorStop(1,this.stateColor+"00"),n.beginPath(),n.moveTo(p(0),a),l.forEach((t,e)=>n.lineTo(p(e),u(t.value))),n.lineTo(p(l.length-1),a),n.closePath(),n.fillStyle=f,n.fill(),n.beginPath(),n.strokeStyle=this.stateColor,n.lineWidth=1.5,n.lineJoin="round",n.lineCap="round",l.forEach((t,e)=>{0===e?n.moveTo(p(e),u(t.value)):n.lineTo(p(e),u(t.value))}),n.stroke()}render(){const t=this.displayValue||`${Math.round(Math.abs(this.value))} W`;return q`
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
  `,t([ft({type:String})],Pt.prototype,"entityId",void 0),t([ft({type:String})],Pt.prototype,"name",void 0),t([ft({type:String})],Pt.prototype,"icon",void 0),t([ft({type:Number})],Pt.prototype,"value",void 0),t([ft({type:String})],Pt.prototype,"unit",void 0),t([ft({type:String})],Pt.prototype,"stateLabel",void 0),t([ft({type:String})],Pt.prototype,"stateColor",void 0),t([ft({type:String})],Pt.prototype,"panelClass",void 0),t([ft({type:String})],Pt.prototype,"badgeClass",void 0),t([ft({type:Boolean})],Pt.prototype,"showSparkline",void 0),t([ft({type:Array})],Pt.prototype,"sparklineHistory",void 0),t([ft({type:String})],Pt.prototype,"displayValue",void 0),t([gt()],Pt.prototype,"_canvasReady",void 0),Pt=t([ct("stat-panel")],Pt);let Tt=class extends dt{constructor(){super(...arguments),this.devices=[],this.wattThreshold=1e3,this._defaultIconPath="M7,2V13H10V22L17,10H13L17,2H7Z"}render(){if(!this.devices||0===this.devices.length)return q`<div class="row"><span class="empty">No devices configured</span></div>`;const t=[...this.devices].sort((t,e)=>e.watts-t.watts);return q`
      <div class="row" role="list" aria-label="Device power consumption">
        ${t.map(t=>q`
            <div
              class="chip ${t.watts<5?"dim":""}"
              role="listitem"
              title="${t.name}: ${vt(t.watts,this.wattThreshold)}"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="${t.icon||this._defaultIconPath}" />
              </svg>
              <span class="chip-name">${t.name}</span>
              <span class="chip-value">${vt(t.watts,this.wattThreshold)}</span>
            </div>
          `)}
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
  `,t([ft({type:Array})],Tt.prototype,"devices",void 0),t([ft({type:Number})],Tt.prototype,"wattThreshold",void 0),Tt=t([ct("device-row")],Tt);let Vt=class extends dt{constructor(){super(...arguments),this._solar=0,this._battery=0,this._grid=0,this._load=0,this._soc=0,this._flows={solarToHome:0,solarToBattery:0,solarToGrid:0,gridToHome:0,batteryToHome:0},this._sparklines={},this._error=null,this._lastSparklineFetch=0,this._sparklineDebounceMs=3e5}get hass(){return this._hass}static getStubConfig(){return{solar:{entity:"sensor.solar_power"},battery:{entity:"sensor.battery_power",soc_entity:"sensor.battery_soc"},grid:{entity:"sensor.grid_power"},load:{entity:"sensor.load_power"}}}static getConfigElement(){return document.createElement("solar-overview-card-editor")}setConfig(t){var e,i,s,o;if(!(null===(e=t.solar)||void 0===e?void 0:e.entity))throw new Error('solar-overview-card: "solar.entity" is required');if(!(null===(i=t.battery)||void 0===i?void 0:i.entity))throw new Error('solar-overview-card: "battery.entity" is required');if(!(null===(s=t.grid)||void 0===s?void 0:s.entity))throw new Error('solar-overview-card: "grid.entity" is required');if(!(null===(o=t.load)||void 0===o?void 0:o.entity))throw new Error('solar-overview-card: "load.entity" is required');this._config={watt_threshold:1e3,show_sparklines:!0,theme:"auto",...t},this._error=null}getCardSize(){return 4}set hass(t){var e,i,s,o;if(this._hass=t,this._config)try{this._solar=this._readEntity(this._config.solar.entity),this._battery=this._readEntity(this._config.battery.entity),this._grid=this._readEntity(this._config.grid.entity),this._load=this._readEntity(this._config.load.entity),this._config.battery.soc_entity&&(this._soc=this._readEntity(this._config.battery.soc_entity)),this._flows=(e=this._solar,i=this._battery,s=this._grid,o=this._load,{solarToHome:e>0?Math.min(e,o):0,solarToBattery:i>0&&e>0?Math.min(i,e):0,solarToGrid:s<0?Math.abs(s):0,gridToHome:s>0?s:0,batteryToHome:i<0?Math.abs(i):0});const t=Date.now();!1!==this._config.show_sparklines&&t-this._lastSparklineFetch>this._sparklineDebounceMs&&(this._lastSparklineFetch=t,this._fetchSparklines())}catch(t){this._error=t.message}}_readEntity(t){var e;if(!(null===(e=this._hass)||void 0===e?void 0:e.states))return 0;const i=this._hass.states[t];return i?mt(i.state):0}async _fetchSparklines(){var t;if(!this._config||!(null===(t=this._hass)||void 0===t?void 0:t.callApi))return;const e=[this._config.solar.entity,this._config.battery.entity,this._config.grid.entity,this._config.load.entity],i=new Date,s=new Date(i.getTime()-72e5).toISOString(),o={};await Promise.allSettled(e.map(async t=>{try{const e=`history/period/${s}?filter_entity_id=${t}&minimal_response=true&no_attributes=true`,i=await this._hass.callApi("GET",e);if(!Array.isArray(i)||0===i.length)return;const r=i[0];o[t]=r.map(t=>{const e=mt(t.state);return isNaN(e)?null:{time:new Date(t.last_updated).getTime(),value:e}}).filter(t=>null!==t)}catch{}})),this._sparklines={...this._sparklines,...o}}_threshold(){var t,e;return null!==(e=null===(t=this._config)||void 0===t?void 0:t.watt_threshold)&&void 0!==e?e:1e3}_deviceItems(){var t,e;return(null===(t=this._config)||void 0===t?void 0:t.devices)&&(null===(e=this._hass)||void 0===e?void 0:e.states)?this._config.devices.map(t=>{var e,i;return{entityId:t.entity,name:null!==(e=t.name)&&void 0!==e?e:t.entity,icon:null!==(i=t.icon)&&void 0!==i?i:"M7,2V13H10V22L17,10H13L17,2H7Z",watts:this._readEntity(t.entity)}}):[]}_statPanelProps(t,e,i,s,o,r){var a,n,l,d,h;const c=this._threshold();return{entityId:r,name:null!==(l=null===(n=null===(a=this._config)||void 0===a?void 0:a["load"===t?"load":t])||void 0===n?void 0:n.name)&&void 0!==l?l:i,icon:s,value:e,displayValue:vt(e,c),stateLabel:_t(r,e),stateColor:o,showSparkline:!1!==(null===(d=this._config)||void 0===d?void 0:d.show_sparklines),sparklineHistory:null!==(h=this._sparklines[r])&&void 0!==h?h:[],panelClass:`panel--${t}`,badgeClass:`badge--${t}`}}render(){var t;if(!this._config)return q`
        <ha-card>
          <div class="error-card">
            solar-overview-card: No configuration found.
          </div>
        </ha-card>
      `;if(this._error)return q`
        <ha-card>
          <div class="error-card">solar-overview-card error: ${this._error}</div>
        </ha-card>
      `;const e=this._threshold(),i=this._deviceItems(),s=this._statPanelProps("solar",this._solar,"Solar","M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M4,4V20H20V4H4M5,5H11V11H5V5M13,5H19V11H13V5M5,13H11V19H5V13M13,13H19V19H13V13Z","#f59e0b",this._config.solar.entity),o=this._statPanelProps("battery",this._battery,"Battery","M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z","#10b981",this._config.battery.entity),r=this._statPanelProps("grid",this._grid,"Grid","M11.5,3.5L10.5,6H13.5L12.5,3.5H11.5M10,7L8.5,10H15.5L14,7H10M8,11L5,17H8L9,14H15L16,17H19L16,11H8M8,18L11,21H13L16,18H8Z","#8b5cf6",this._config.grid.entity),a=this._statPanelProps("load",this._load,"Home","M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z","#3b82f6",this._config.load.entity);return q`
      <ha-card>
        <div class="card" theme="${null!==(t=this._config.theme)&&void 0!==t?t:"auto"}">

          <!-- Flow diagram -->
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

          <!-- 2×2 stat grid -->
          <div class="stat-grid">
            <stat-panel
              .entityId="${s.entityId}"
              .name="${s.name}"
              .icon="${s.icon}"
              .value="${s.value}"
              .displayValue="${s.displayValue}"
              .stateLabel="${s.stateLabel}"
              .stateColor="${s.stateColor}"
              .showSparkline="${s.showSparkline}"
              .sparklineHistory="${s.sparklineHistory}"
              .panelClass="${s.panelClass}"
              .badgeClass="${s.badgeClass}"
            ></stat-panel>

            <stat-panel
              .entityId="${o.entityId}"
              .name="${o.name}"
              .icon="${o.icon}"
              .value="${o.value}"
              .displayValue="${o.displayValue}"
              .stateLabel="${o.stateLabel}"
              .stateColor="${o.stateColor}"
              .showSparkline="${o.showSparkline}"
              .sparklineHistory="${o.sparklineHistory}"
              .panelClass="${o.panelClass}"
              .badgeClass="${o.badgeClass}"
            ></stat-panel>

            <stat-panel
              .entityId="${r.entityId}"
              .name="${r.name}"
              .icon="${r.icon}"
              .value="${r.value}"
              .displayValue="${r.displayValue}"
              .stateLabel="${r.stateLabel}"
              .stateColor="${r.stateColor}"
              .showSparkline="${r.showSparkline}"
              .sparklineHistory="${r.sparklineHistory}"
              .panelClass="${r.panelClass}"
              .badgeClass="${r.badgeClass}"
            ></stat-panel>

            <stat-panel
              .entityId="${a.entityId}"
              .name="${a.name}"
              .icon="${a.icon}"
              .value="${a.value}"
              .displayValue="${a.displayValue}"
              .stateLabel="${a.stateLabel}"
              .stateColor="${a.stateColor}"
              .showSparkline="${a.showSparkline}"
              .sparklineHistory="${a.sparklineHistory}"
              .panelClass="${a.panelClass}"
              .badgeClass="${a.badgeClass}"
            ></stat-panel>
          </div>

          <!-- Devices row -->
          ${this._config.devices&&this._config.devices.length>0?q`
                <div class="devices-section">
                  <div class="devices-label">Devices</div>
                  <device-row
                    .devices="${i}"
                    .wattThreshold="${e}"
                  ></device-row>
                </div>
              `:""}
        </div>
      </ha-card>
    `}updated(t){super.updated(t)}};Vt.styles=[yt,a`
      :host {
        display: block;
      }
      ha-card {
        overflow: hidden;
      }
    `],t([gt()],Vt.prototype,"_config",void 0),t([gt()],Vt.prototype,"_solar",void 0),t([gt()],Vt.prototype,"_battery",void 0),t([gt()],Vt.prototype,"_grid",void 0),t([gt()],Vt.prototype,"_load",void 0),t([gt()],Vt.prototype,"_soc",void 0),t([gt()],Vt.prototype,"_flows",void 0),t([gt()],Vt.prototype,"_sparklines",void 0),t([gt()],Vt.prototype,"_error",void 0),Vt=t([ct("solar-overview-card")],Vt);let Lt=class extends dt{setConfig(t){this._config=t}_valueChanged(t){var e,i,s;if(!this._config)return;const o=t.target;if(!o.configValue)return;const r=o.configValue.split("."),a=JSON.parse(JSON.stringify(this._config)),n=a;if(2===r.length){const[t,s]=r,a=null!==(e=n[t])&&void 0!==e?e:{};a[s]=null!==(i=o.value)&&void 0!==i?i:"",n[t]=a}else n[r[0]]=null!==(s=o.value)&&void 0!==s?s:"";this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:a}}))}_entityPicker(t,e,i){return q`
      <ha-entity-picker
        .hass="${this.hass}"
        .label="${t}"
        .value="${i}"
        .configValue="${e}"
        allow-custom-entity
        @value-changed="${this._valueChanged}"
      ></ha-entity-picker>
    `}render(){var t,e,i,s,o,r,a,n,l,d,h;return this._config?q`
      <div class="row">
        <div class="section-title">Required entities</div>

        ${this._entityPicker("Solar power entity","solar.entity",null!==(e=null===(t=this._config.solar)||void 0===t?void 0:t.entity)&&void 0!==e?e:"")}

        ${this._entityPicker("Battery power entity","battery.entity",null!==(s=null===(i=this._config.battery)||void 0===i?void 0:i.entity)&&void 0!==s?s:"")}

        ${this._entityPicker("Battery state of charge entity","battery.soc_entity",null!==(r=null===(o=this._config.battery)||void 0===o?void 0:o.soc_entity)&&void 0!==r?r:"")}

        ${this._entityPicker("Grid power entity","grid.entity",null!==(n=null===(a=this._config.grid)||void 0===a?void 0:a.entity)&&void 0!==n?n:"")}

        ${this._entityPicker("Home load / consumption entity","load.entity",null!==(d=null===(l=this._config.load)||void 0===l?void 0:l.entity)&&void 0!==d?d:"")}

        <div class="section-title">Display options</div>

        <ha-select
          label="Theme"
          .value="${null!==(h=this._config.theme)&&void 0!==h?h:"auto"}"
          .configValue="theme"
          @selected="${this._valueChanged}"
          @closed="${t=>t.stopPropagation()}"
        >
          <mwc-list-item value="auto">Auto (follows HA theme)</mwc-list-item>
          <mwc-list-item value="light">Light</mwc-list-item>
          <mwc-list-item value="dark">Dark</mwc-list-item>
        </ha-select>

        <ha-formfield label="Show sparkline history charts">
          <ha-switch
            .checked="${!1!==this._config.show_sparklines}"
            .configValue="show_sparklines"
            @change="${t=>{const e=t.target;if(!this._config)return;const i={...this._config,show_sparklines:e.checked};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i}}))}}"
          ></ha-switch>
        </ha-formfield>

        <p class="hint">
          Sign convention: solar ≥ 0, battery positive = charging / negative = discharging,
          grid positive = importing / negative = exporting, load ≥ 0.
        </p>
      </div>
    `:q``}};Lt.styles=a`
    :host { display: block; padding: 16px; }
    .row {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .section-title {
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--secondary-text-color, #9ca3af);
      margin: 8px 0 4px;
    }
    .hint {
      font-size: 0.75rem;
      color: var(--secondary-text-color, #9ca3af);
      margin-top: 4px;
    }
  `,t([ft({attribute:!1})],Lt.prototype,"hass",void 0),t([gt()],Lt.prototype,"_config",void 0),Lt=t([ct("solar-overview-card-editor")],Lt),window.customCards=window.customCards||[],window.customCards.push({type:"solar-overview-card",name:"Solar Overview Card",description:"Animated solar energy overview with power flow diagram",preview:!0});export{Vt as SolarOverviewCard,Lt as SolarOverviewCardEditor};
