function t(t,e,i,o){var r,s=arguments.length,a=s<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(a=(s<3?r(a):s>3?r(e,i,a):r(e,i))||a);return s>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),r=new WeakMap;let s=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new s(i,t,o)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:v}=Object,g=globalThis,u=g.trustedTypes,y=u?u.emptyScript:"",f=g.reactiveElementPolyfillSupport,_=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:b};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&d(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const s=o?.call(this);r?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=v(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),r=e.litNonce;void 0!==r&&o.setAttribute("nonce",r),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:m).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=o;const s=r.fromAttribute(e,t.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(t,e,i,o=!1,r){if(void 0!==t){const s=this.constructor;if(!1===o&&(r=this[t]),i??=s.getPropertyOptions(t),!((i.hasChanged??b)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:r},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==r||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,f?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,k=t=>t,S=w.trustedTypes,C=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,H="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+A,E=`<${P}>`,M=document,T=()=>M.createComment(""),V=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,L="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,B=/-->/g,z=/>/g,F=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,R=/"/g,O=/^(?:script|style|textarea|title)$/i,U=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),G=U(1),j=U(2),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Z=new WeakMap,J=M.createTreeWalker(M,129);function Y(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,o=[];let r,s=2===e?"<svg>":3===e?"<math>":"",a=D;for(let e=0;e<i;e++){const i=t[e];let n,l,d=-1,c=0;for(;c<i.length&&(a.lastIndex=c,l=a.exec(i),null!==l);)c=a.lastIndex,a===D?"!--"===l[1]?a=B:void 0!==l[1]?a=z:void 0!==l[2]?(O.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=F):void 0!==l[3]&&(a=F):a===F?">"===l[0]?(a=r??D,d=-1):void 0===l[1]?d=-2:(d=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?F:'"'===l[3]?R:I):a===R||a===I?a=F:a===B||a===z?a=D:(a=F,r=void 0);const h=a===F&&t[e+1].startsWith("/>")?" ":"";s+=a===D?i+E:d>=0?(o.push(n),i.slice(0,d)+H+i.slice(d)+A+h):i+A+(-2===d?e:h)}return[Y(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class X{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,s=0;const a=t.length-1,n=this.parts,[l,d]=K(t,e);if(this.el=X.createElement(l,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=J.nextNode())&&n.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(H)){const e=d[s++],i=o.getAttribute(t).split(A),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?ot:"?"===a[1]?rt:"@"===a[1]?st:it}),o.removeAttribute(t)}else t.startsWith(A)&&(n.push({type:6,index:r}),o.removeAttribute(t));if(O.test(o.tagName)){const t=o.textContent.split(A),e=t.length-1;if(e>0){o.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],T()),J.nextNode(),n.push({type:2,index:++r});o.append(t[e],T())}}}else if(8===o.nodeType)if(o.data===P)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(A,t+1));)n.push({type:7,index:r}),t+=A.length-1}r++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,o){if(e===W)return e;let r=void 0!==o?i._$Co?.[o]:i._$Cl;const s=V(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),void 0===s?r=void 0:(r=new s(t),r._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=r:i._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,o)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??M).importNode(e,!0);J.currentNode=o;let r=J.nextNode(),s=0,a=0,n=i[0];for(;void 0!==n;){if(s===n.index){let e;2===n.type?e=new et(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new at(r,this,t)),this._$AV.push(e),n=i[++a]}s!==n?.index&&(r=J.nextNode(),s++)}return J.currentNode=M,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),V(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&V(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=X.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new tt(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new X(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const r of t)o===e.length?e.push(i=new et(this.O(T()),this.O(T()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,o){const r=this.strings;let s=!1;if(void 0===r)t=Q(this,t,e,0),s=!V(t)||t!==this._$AH&&t!==W,s&&(this._$AH=t);else{const o=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=Q(this,o[i+a],e,a),n===W&&(n=this._$AH[a]),s||=!V(n)||n!==this._$AH[a],n===q?t=q:t!==q&&(t+=(n??"")+r[a+1]),this._$AH[a]=n}s&&!o&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class rt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends it{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??q)===W)return;const i=this._$AH,o=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==q&&(i===q||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(X,et),(w.litHtmlVersions??=[]).push("3.3.2");const lt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class dt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let r=o._$litPart$;if(void 0===r){const t=i?.renderBefore??null;o._$litPart$=r=new et(e.insertBefore(T(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}dt._$litElement$=!0,dt.finalized=!0,lt.litElementHydrateSupport?.({LitElement:dt});const ct=lt.litElementPolyfillSupport;ct?.({LitElement:dt}),(lt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:b},vt=(t=pt,e,i)=>{const{kind:o,metadata:r}=i;let s=globalThis.litPropertyMetadata.get(r);if(void 0===s&&globalThis.litPropertyMetadata.set(r,s=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),s.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,r,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const r=this[o];e.call(this,i),this.requestUpdate(o,r,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function gt(t){return(e,i)=>"object"==typeof i?vt(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return gt({...t,state:!0,attribute:!1})}const yt=a`
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
`;function ft(t,e){return Math.abs(t)>=e?`${(t/1e3).toFixed(1)} kW`:`${Math.round(t)} W`}function _t(t){if(null==t)return 0;const e="number"==typeof t?t:parseFloat(t);return isNaN(e)?0:e}function mt(t){const{solar:e,battery:i,load:o,gridCombined:r}=t,s=void 0!==t.gridImport?Math.max(0,t.gridImport):r>0?r:0,a=e>0?void 0!==t.gridExport?Math.max(0,t.gridExport):r<0?Math.abs(r):0:0,n=i>0&&e>0?Math.min(i,e):0;return{solarToHome:e>0?o>0?Math.min(e,o):Math.max(0,e-a-n):0,solarToBattery:n,solarToGrid:a,gridToHome:s,batteryToHome:i<0?Math.abs(i):0,gridToBattery:void 0!==t.gridToBattery?Math.max(0,t.gridToBattery):void 0!==t.gridBatteryCombined&&t.gridBatteryCombined>0?t.gridBatteryCombined:0,batteryToGrid:void 0!==t.batteryToGrid?Math.max(0,t.batteryToGrid):void 0!==t.gridBatteryCombined&&t.gridBatteryCombined<0?Math.abs(t.gridBatteryCombined):0}}function bt(t,e){const i=t.toLowerCase();return i.includes("solar")||i.includes("pv")?e>0?"Generating":"Idle":i.includes("battery")||i.includes("batt")?e>0?"Charging":e<0?"Discharging":"Idle":i.includes("grid")?e>0?"Importing":e<0?"Exporting":"Idle":i.includes("load")||i.includes("home")||i.includes("consumption")?e>0?"Consuming":"Idle":e>0?"Active":"Idle"}const $t=32,xt=17;let wt=class extends dt{constructor(){super(...arguments),this.solar=0,this.battery=0,this.grid=0,this.load=0,this.socPercent=0,this.wattThreshold=1e3,this.solarName="Solar",this.gridName="Grid",this.homeName="Home",this.batteryName="Battery",this.solarSecondary="",this.gridSecondary="",this.homeSecondary="",this.batterySecondary="",this.flows={solarToHome:0,solarToBattery:0,solarToGrid:0,gridToHome:0,batteryToHome:0,gridToBattery:0,batteryToGrid:0},this.diagramDevices=[],this.backgroundImage="",this.editMode=!1,this.textColor="#ffffff",this.nodeStyle="circle",this.showFlowLines=!0,this.solarColor="",this.gridColor="",this.homeColor="",this.batteryNodeColor="",this._pos={solar:{x:150,y:50},grid:{x:50,y:150},home:{x:250,y:150},battery:{x:150,y:250}},this._dragging=null,this._dragStartClient={x:0,y:0},this._dragStartPos={x:0,y:0}}willUpdate(t){var e,i,o,r,s;if(t.has("nodePositions")){const t=null!==(e=this.nodePositions)&&void 0!==e?e:{};this._pos={solar:{x:150,y:50,...null!==(i=t.solar)&&void 0!==i?i:{}},grid:{x:50,y:150,...null!==(o=t.grid)&&void 0!==o?o:{}},home:{x:250,y:150,...null!==(r=t.home)&&void 0!==r?r:{}},battery:{x:150,y:250,...null!==(s=t.battery)&&void 0!==s?s:{}}}}}_onNodePointerDown(t,e){this.editMode&&(t.preventDefault(),t.stopPropagation(),this._dragging=e,this._dragStartClient={x:t.clientX,y:t.clientY},this._dragStartPos={...this._pos[e]},t.currentTarget.setPointerCapture(t.pointerId))}_onPointerMove(t){if(!this._dragging)return;const e=this.shadowRoot.querySelector("svg").getScreenCTM();if(!e)return;const i=(t.clientX-this._dragStartClient.x)/e.a,o=(t.clientY-this._dragStartClient.y)/e.d;this._pos={...this._pos,[this._dragging]:{x:Math.round(this._dragStartPos.x+i),y:Math.round(this._dragStartPos.y+o)}}}_onPointerUp(){this._dragging&&(this._dragging=null,this.dispatchEvent(new CustomEvent("nodes-moved",{detail:{positions:{...this._pos}},bubbles:!0,composed:!0})))}_bgFill(t){return t.startsWith("rgb(")?t.replace("rgb(","rgba(").replace(")",", 0.15)"):`${t}26`}get _nodeMargin(){return"card"===this.nodeStyle?29:36}_batteryColor(){const t=Math.max(0,Math.min(100,this.socPercent));let e,i,o;if(t>=50){const r=(t-50)/50;e=Math.round(16+229*r),i=Math.round(185+-27*r),o=Math.round(129+-118*r)}else{const r=t/50;e=Math.round(239+6*r),i=Math.round(68+90*r),o=Math.round(68+-57*r)}return`rgb(${e},${i},${o})`}_lineWidth(t){return t<=0?2:Math.min(8,Math.max(2,t/1e3*4+2))}_trim(t,e,i,o,r=36){const s=i-t,a=o-e,n=Math.sqrt(s*s+a*a);return 0===n?{x1:t,y1:e,x2:i,y2:o}:{x1:t+s/n*r,y1:e+a/n*r,x2:i-s/n*r,y2:o-a/n*r}}_flowLine(t,e,i,o,r,s,a=!1){const n=r>1,{x1:l,y1:d,x2:c,y2:h}=this._trim(t,e,i,o,this._nodeMargin),p=this._lineWidth(r),v=n?a?"flow-active-rev":"flow-active":"";return j`
      <line
        x1="${l}" y1="${d}" x2="${c}" y2="${h}"
        stroke="${s}" stroke-width="${p}" stroke-linecap="round"
        stroke-dasharray="${n?"8 6":"4 6"}"
        stroke-dashoffset="0"
        opacity="${n?function(t,e){return e<=0?1:Math.min(1,Math.max(.2,Math.abs(t)/e))}(r,5e3):.13}"
        class="${v}"
      />
    `}_deviceLine(t,e,i,o,r,s){const a=r>5,{x1:n,y1:l,x2:d,y2:c}=this._trim(t,e,i,o,35),h=d-n,p=c-l,v=Math.sqrt(h*h+p*p);return j`
      <line
        x1="${n}" y1="${l}" x2="${v>0?d-h/v*20:d}" y2="${v>0?c-p/v*20:c}"
        stroke="${s}" stroke-width="${a?2:1.5}" stroke-linecap="round"
        stroke-dasharray="${a?"6 5":"3 5"}" stroke-dashoffset="0"
        opacity="${a?.85:.2}"
        class="${a?"flow-active":""}"
      />
    `}_node(t,e,i,o,r,s,a,n,l){const d=this.textColor,c=this.editMode&&this._dragging===l,h="card"===this.nodeStyle,p=h?23:$t,v=this.editMode?j`
      ${h?j`<rect x="${t-41-6}" y="${e-p-6}"
            width="${94}" height="${58}" rx="${14}"
            fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"
            stroke-dasharray="4 3" opacity="${c?1:.6}" />`:j`<circle cx="${t}" cy="${e}" r="${38}"
            fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"
            stroke-dasharray="4 3" opacity="${c?1:.6}" />`}
    `:"",g=h?j`<rect x="${t-41}" y="${e-p}"
          width="${82}" height="${46}" rx="${10}"
          fill="${a}" stroke="${s}" stroke-width="${c?3:2}" />`:j`<circle cx="${t}" cy="${e}" r="${$t}"
          fill="${a}" stroke="${s}" stroke-width="${c?3:2}" />`,u=j`
      <g transform="translate(${t-18}, ${e-18}) scale(${1.5})">
        <path d="${i}" fill="${s}" />
      </g>
    `;return j`
      <g
        class="${this.editMode?"draggable":""} node"
        @pointerdown="${t=>this._onNodePointerDown(t,l)}"
        @pointermove="${t=>this._onPointerMove(t)}"
        @pointerup="${()=>this._onPointerUp()}"
      >
        ${v}
        ${g}
        ${u}
        <text x="${t}" y="${e+p+14}" text-anchor="middle"
          font-size="10" font-family="Roboto, sans-serif"
          fill="${d}" opacity="0.65">${o}</text>
        <text x="${t}" y="${e+p+26}" text-anchor="middle"
          font-size="11" font-weight="700" font-family="Roboto, sans-serif"
          fill="${d}">${ft(r,this.wattThreshold)}</text>
        ${n?j`
          <text x="${t}" y="${e+p+38}" text-anchor="middle"
            font-size="9" font-family="Roboto, sans-serif"
            fill="${d}" opacity="0.65">${n}</text>
        `:""}
      </g>
    `}_deviceNode(t,e,i){const o=i.color||"#6366f1",r=o.startsWith("rgb")?o.replace("rgb(","rgba(").replace(")",", 0.15)"):`${o}26`,s=i.name.length>10?i.name.slice(0,9)+"…":i.name,a=i.watts>5,n=this.textColor;return j`
      <g class="device-node" opacity="${a?1:.45}">
        <circle cx="${t}" cy="${e}" r="${xt}"
          fill="${r}" stroke="${o}" stroke-width="${a?2:1}" />
        <g transform="translate(${t-9}, ${e-9}) scale(${.75})">
          <path d="${"M7,2V13H10V22L17,10H13L17,2H7Z"}" fill="${o}" />
        </g>
        <text x="${t}" y="${e+xt+11}" text-anchor="middle"
          font-size="8.5" font-family="Roboto, sans-serif"
          fill="${n}" opacity="0.65">${s}</text>
        <text x="${t}" y="${e+xt+21}" text-anchor="middle"
          font-size="9" font-weight="700" font-family="Roboto, sans-serif"
          fill="${n}">${ft(i.watts,this.wattThreshold)}</text>
      </g>
    `}_socRing(t,e){const i=this._batteryColor(),o=e+("card"===this.nodeStyle?23:$t)+(this.batterySecondary?50:38);if("card"===this.nodeStyle)return j`
        <text x="${t}" y="${o}"
          text-anchor="middle" font-size="9" font-family="Roboto, sans-serif"
          fill="${i}" font-weight="600">${this.socPercent.toFixed(0)}%</text>
      `;const r=2*Math.PI*37,s=this.socPercent/100*r;return j`
      <circle
        cx="${t}" cy="${e}" r="${37}"
        fill="none" stroke="${i}" stroke-width="3"
        stroke-dasharray="${s} ${r-s}"
        stroke-dashoffset="0"
        transform="rotate(-90 ${t} ${e})"
        opacity="0.85" stroke-linecap="round"
      />
      <text x="${t}" y="${o}"
        text-anchor="middle" font-size="9" font-family="Roboto, sans-serif"
        fill="${i}" font-weight="600">${this.socPercent.toFixed(0)}%</text>
    `}render(){var t;const e=this.flows,i=this._pos,o=this.solarColor||"#f59e0b",r=this.gridColor||"#8b5cf6",s=this.homeColor||"#3b82f6",a=this.batteryNodeColor||this._batteryColor();this._batteryColor();const n=this._bgFill(a),l=null!==(t=this.diagramDevices)&&void 0!==t?t:[],d=l.length,c=d>0,h=i.home.x+82,p=52*(d-1),v=i.home.y-p/2,g=l.map((t,e)=>({d:t,x:h,y:v+52*e})),u=[i.solar.x,i.grid.x,i.home.x,i.battery.x,...g.map(t=>t.x)],y=[i.solar.y,i.grid.y,i.home.y,i.battery.y,...g.map(t=>t.y)],f=Math.min(...u)-92,_=Math.min(...y)-92,m=Math.max(...u)+92+(c?47:0)-f,b=Math.max(...y)+92-_;return G`
      <svg
        viewBox="${`${f} ${_} ${m} ${b}`}"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Solar power flow diagram"
        role="img"
        style="width:100%;height:auto;display:block;${this.editMode?"touch-action:none;":""}"
        @pointermove="${t=>this._onPointerMove(t)}"
        @pointerup="${()=>this._onPointerUp()}"
      >
        <!-- Background image -->
        ${this.backgroundImage?j`
          <image
            href="${this.backgroundImage}"
            x="${f}" y="${_}"
            width="${m}" height="${b}"
            preserveAspectRatio="xMidYMid slice"
          />
        `:""}

        <!-- Edit mode hint -->
        ${this.editMode?j`
          <text x="${f+m/2}" y="${_+18}"
            text-anchor="middle" font-size="10" font-family="Roboto, sans-serif"
            fill="rgba(255,255,255,0.5)">drag nodes to reposition</text>
        `:""}

        <!-- Flow lines -->
        ${this.showFlowLines?j`
          ${this._flowLine(i.solar.x,i.solar.y,i.home.x,i.home.y,e.solarToHome,"#f59e0b")}
          ${this._flowLine(i.solar.x,i.solar.y,i.battery.x,i.battery.y,e.solarToBattery,"#f59e0b")}
          ${this._flowLine(i.solar.x,i.solar.y,i.grid.x,i.grid.y,e.solarToGrid,"#f59e0b")}
          ${this._flowLine(i.grid.x,i.grid.y,i.home.x,i.home.y,e.gridToHome,"#8b5cf6")}
          ${this._flowLine(i.battery.x,i.battery.y,i.home.x,i.home.y,e.batteryToHome,a)}
          ${e.batteryToGrid>e.gridToBattery?this._flowLine(i.battery.x,i.battery.y,i.grid.x,i.grid.y,e.batteryToGrid,"#10b981"):this._flowLine(i.grid.x,i.grid.y,i.battery.x,i.battery.y,e.gridToBattery,"#8b5cf6")}
          ${g.map(({d:t,x:e,y:o})=>this._deviceLine(i.home.x,i.home.y,e,o,t.watts,t.color||"#6366f1"))}
        `:""}

        <!-- SOC ring / text -->
        ${this._socRing(i.battery.x,i.battery.y)}

        <!-- Main nodes -->
        ${this._node(i.solar.x,i.solar.y,"M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M4,4V20H20V4H4M5,5H11V11H5V5M13,5H19V11H13V5M5,13H11V19H5V13M13,13H19V19H13V13Z",this.solarName,this.solar,o,this._bgFill(o),this.solarSecondary,"solar")}
        ${this._node(i.grid.x,i.grid.y,"M11.5,3.5L10.5,6H13.5L12.5,3.5H11.5M10,7L8.5,10H15.5L14,7H10M8,11L5,17H8L9,14H15L16,17H19L16,11H8M8,18L11,21H13L16,18H8Z",this.gridName,this.grid,r,this._bgFill(r),this.gridSecondary,"grid")}
        ${this._node(i.home.x,i.home.y,"M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z",this.homeName,this.load,s,this._bgFill(s),this.homeSecondary,"home")}
        ${this._node(i.battery.x,i.battery.y,"M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z",this.batteryName,this.battery,a,n,this.batterySecondary,"battery")}

        <!-- Device satellite nodes -->
        ${g.map(({d:t,x:e,y:i})=>this._deviceNode(e,i,t))}
      </svg>
    `}updated(t){super.updated(t)}};wt.styles=a`
    :host { display: block; }
    @keyframes flow-anim     { to { stroke-dashoffset: -20; } }
    @keyframes flow-anim-rev { to { stroke-dashoffset:  20; } }
    .flow-active     { animation: flow-anim     0.8s linear infinite; }
    .flow-active-rev { animation: flow-anim-rev 0.8s linear infinite; }
    .draggable { cursor: grab; }
    .draggable:active { cursor: grabbing; }
  `,t([gt({type:Number})],wt.prototype,"solar",void 0),t([gt({type:Number})],wt.prototype,"battery",void 0),t([gt({type:Number})],wt.prototype,"grid",void 0),t([gt({type:Number})],wt.prototype,"load",void 0),t([gt({type:Number})],wt.prototype,"socPercent",void 0),t([gt({type:Number})],wt.prototype,"wattThreshold",void 0),t([gt({type:String})],wt.prototype,"solarName",void 0),t([gt({type:String})],wt.prototype,"gridName",void 0),t([gt({type:String})],wt.prototype,"homeName",void 0),t([gt({type:String})],wt.prototype,"batteryName",void 0),t([gt({type:String})],wt.prototype,"solarSecondary",void 0),t([gt({type:String})],wt.prototype,"gridSecondary",void 0),t([gt({type:String})],wt.prototype,"homeSecondary",void 0),t([gt({type:String})],wt.prototype,"batterySecondary",void 0),t([gt({type:Object})],wt.prototype,"flows",void 0),t([gt({type:Array})],wt.prototype,"diagramDevices",void 0),t([gt({type:String})],wt.prototype,"backgroundImage",void 0),t([gt({type:Boolean})],wt.prototype,"editMode",void 0),t([gt({type:Object})],wt.prototype,"nodePositions",void 0),t([gt({type:String})],wt.prototype,"textColor",void 0),t([gt({type:String})],wt.prototype,"nodeStyle",void 0),t([gt({type:Boolean})],wt.prototype,"showFlowLines",void 0),t([gt({type:String})],wt.prototype,"solarColor",void 0),t([gt({type:String})],wt.prototype,"gridColor",void 0),t([gt({type:String})],wt.prototype,"homeColor",void 0),t([gt({type:String})],wt.prototype,"batteryNodeColor",void 0),t([ut()],wt.prototype,"_pos",void 0),t([ut()],wt.prototype,"_dragging",void 0),wt=t([ht("flow-diagram")],wt);let kt=class extends dt{constructor(){super(...arguments),this.entityId="",this.name="",this.icon="",this.value=0,this.unit="W",this.stateLabel="",this.stateColor="#3b82f6",this.panelClass="",this.badgeClass="",this.showSparkline=!0,this.sparklineHistory=[],this.displayValue="",this._canvasReady=!1}updated(t){super.updated(t),this.showSparkline&&t.has("sparklineHistory")&&this._drawSparkline(),t.has("showSparkline")&&this.showSparkline&&(this._canvasReady=!0,this.requestUpdate(),this.updateComplete.then(()=>this._drawSparkline()))}_drawSparkline(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("canvas");if(!e)return;const i=this.sparklineHistory;if(!i||i.length<2)return;const o=window.devicePixelRatio||1,r=e.getBoundingClientRect(),s=r.width||200,a=r.height||48;e.width=s*o,e.height=a*o;const n=e.getContext("2d");if(!n)return;n.scale(o,o),n.clearRect(0,0,s,a);const l=i.slice(-60),d=l.map(t=>t.value),c=Math.min(...d),h=Math.max(...d)-c||1,p=t=>t/(l.length-1)*s,v=t=>a-4-(t-c)/h*(a-8),g=n.createLinearGradient(0,0,0,a);g.addColorStop(0,this.stateColor+"55"),g.addColorStop(1,this.stateColor+"00"),n.beginPath(),n.moveTo(p(0),a),l.forEach((t,e)=>n.lineTo(p(e),v(t.value))),n.lineTo(p(l.length-1),a),n.closePath(),n.fillStyle=g,n.fill(),n.beginPath(),n.strokeStyle=this.stateColor,n.lineWidth=1.5,n.lineJoin="round",n.lineCap="round",l.forEach((t,e)=>{0===e?n.moveTo(p(e),v(t.value)):n.lineTo(p(e),v(t.value))}),n.stroke()}render(){const t=this.displayValue||`${Math.round(Math.abs(this.value))} W`;return G`
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

        ${this.showSparkline?G`<canvas aria-hidden="true"></canvas>`:""}
      </div>
    `}};kt.styles=a`
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
  `,t([gt({type:String})],kt.prototype,"entityId",void 0),t([gt({type:String})],kt.prototype,"name",void 0),t([gt({type:String})],kt.prototype,"icon",void 0),t([gt({type:Number})],kt.prototype,"value",void 0),t([gt({type:String})],kt.prototype,"unit",void 0),t([gt({type:String})],kt.prototype,"stateLabel",void 0),t([gt({type:String})],kt.prototype,"stateColor",void 0),t([gt({type:String})],kt.prototype,"panelClass",void 0),t([gt({type:String})],kt.prototype,"badgeClass",void 0),t([gt({type:Boolean})],kt.prototype,"showSparkline",void 0),t([gt({type:Array})],kt.prototype,"sparklineHistory",void 0),t([gt({type:String})],kt.prototype,"displayValue",void 0),t([ut()],kt.prototype,"_canvasReady",void 0),kt=t([ht("stat-panel")],kt);let St=class extends dt{constructor(){super(...arguments),this.devices=[],this.wattThreshold=1e3,this._defaultIconPath="M7,2V13H10V22L17,10H13L17,2H7Z"}render(){if(!this.devices||0===this.devices.length)return G`<div class="row"><span class="empty">No devices configured</span></div>`;const t=[...this.devices].sort((t,e)=>e.watts-t.watts);return G`
      <div class="row" role="list" aria-label="Device power consumption">
        ${t.map(t=>{var e;return G`
            <div
              class="chip ${t.watts<5?"dim":""}"
              role="listitem"
              title="${t.name}: ${ft(t.watts,this.wattThreshold)}"
              style="${t.color?`border-color: ${t.color}33;`:""}"
            >
              ${(null===(e=t.icon)||void 0===e?void 0:e.startsWith("mdi:"))?G`<ha-icon icon="${t.icon}" style="${t.color?`color:${t.color};`:""}"></ha-icon>`:G`<svg viewBox="0 0 24 24" aria-hidden="true"
                    style="${t.color?`fill:${t.color};`:""}">
                    <path d="${t.icon||this._defaultIconPath}" />
                  </svg>`}
              <span class="chip-name">${t.name}</span>
              <span class="chip-value">${ft(t.watts,this.wattThreshold)}</span>
            </div>
          `})}
      </div>
    `}};St.styles=a`
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
  `,t([gt({type:Array})],St.prototype,"devices",void 0),t([gt({type:Number})],St.prototype,"wattThreshold",void 0),St=t([ht("device-row")],St);const Ct=[{key:"solar",enabled:!0},{key:"battery",enabled:!0},{key:"grid",enabled:!0},{key:"load",enabled:!0}];let Ht=class extends dt{constructor(){super(...arguments),this._solar=0,this._battery=0,this._grid=0,this._load=0,this._soc=0,this._solarExport=0,this._gridToBattery=0,this._flows={solarToHome:0,solarToBattery:0,solarToGrid:0,gridToHome:0,batteryToHome:0,gridToBattery:0,batteryToGrid:0},this._sparklines={},this._error=null,this._lastSparklineFetch=0,this._sparklineDebounceMs=3e5}get hass(){return this._hass}static getStubConfig(){return{solar:{entity:"sensor.solar_power"},battery:{entity:"sensor.battery_power",soc_entity:"sensor.battery_soc"},grid:{entity:"sensor.grid_power"},load:{entity:"sensor.load_power"}}}static getConfigElement(){return document.createElement("solar-overview-card-editor")}setConfig(t){var e,i,o;if(!(null===(e=t.solar)||void 0===e?void 0:e.entity))throw new Error('solar-overview-card: "solar.entity" required');if(!(null===(i=t.battery)||void 0===i?void 0:i.entity))throw new Error('solar-overview-card: "battery.entity" required');const r=t.grid,s=!!(null===(o=t.load)||void 0===o?void 0:o.entity),a=!!((null==r?void 0:r.entity)||(null==r?void 0:r.import_entity)||(null==r?void 0:r.export_entity)||(null==r?void 0:r.battery_entity));if(!s&&!a)throw new Error("solar-overview-card: at least one of load.entity or a grid entity is required");this._config={watt_threshold:1e3,show_sparklines:!0,theme:"auto",show_flow:!0,show_stats:!0,show_devices:!0,...t},this._error=null}getCardSize(){return 4}set hass(t){if(this._hass=t,this._config)try{const t=this._config.grid,e=this._readEntity(this._config.solar.entity),i=this._readEntity(this._config.battery.entity),o=this._config.load.entity?this._readEntity(this._config.load.entity):0,r=t.entity?this._readEntity(t.entity):0;this._solar=this._config.solar.invert?-e:e,this._battery=this._config.battery.invert?-i:i,this._grid=t.invert?-r:r,this._load=this._config.load.invert?-o:o,this._config.battery.soc_entity&&(this._soc=this._readEntity(this._config.battery.soc_entity));const s=t.import_entity?this._readEntity(t.import_entity):void 0,a=t.export_entity?this._readEntity(t.export_entity):this._config.solar.export_entity?this._readEntity(this._config.solar.export_entity):void 0,n=t.to_battery_entity?this._readEntity(t.to_battery_entity):this._config.battery.grid_charge_entity?this._readEntity(this._config.battery.grid_charge_entity):void 0,l=t.from_battery_entity?this._readEntity(t.from_battery_entity):void 0,d=t.battery_entity?this._readEntity(t.battery_entity):void 0;this._flows=mt({solar:this._solar,battery:this._battery,load:this._load,gridCombined:this._grid,gridImport:s,gridExport:a,gridToBattery:n,batteryToGrid:l,gridBatteryCombined:d});const c=Date.now();!1!==this._config.show_sparklines&&c-this._lastSparklineFetch>this._sparklineDebounceMs&&(this._lastSparklineFetch=c,this._fetchSparklines())}catch(t){this._error=t.message}}_readEntity(t){var e;if(!(null===(e=this._hass)||void 0===e?void 0:e.states))return 0;const i=this._hass.states[t];return i?_t(i.state):0}async _fetchSparklines(){var t,e,i,o;if(!this._config||!(null===(t=this._hass)||void 0===t?void 0:t.callApi))return;const r=(null!==(e=this._config.panels)&&void 0!==e?e:[]).filter(t=>!t.key&&t.entity).map(t=>t.entity),s=[this._config.solar.entity,this._config.battery.entity,null!==(i=this._config.grid.entity)&&void 0!==i?i:this._config.grid.import_entity,this._config.load.entity,...r].filter(t=>!!t),a=new Date,n=null!==(o=this._config.sparkline_hours)&&void 0!==o?o:2,l=new Date(a.getTime()-60*n*60*1e3).toISOString(),d={};await Promise.allSettled(s.map(async t=>{try{const e=`history/period/${l}?filter_entity_id=${t}&minimal_response=true&no_attributes=true`,i=await this._hass.callApi("GET",e);if(!Array.isArray(i)||0===i.length)return;d[t]=i[0].map(t=>{const e=_t(t.state);return isNaN(e)?null:{time:new Date(t.last_updated).getTime(),value:e}}).filter(t=>null!==t)}catch{}})),this._sparklines={...this._sparklines,...d}}_threshold(){var t,e;return null!==(e=null===(t=this._config)||void 0===t?void 0:t.watt_threshold)&&void 0!==e?e:1e3}_secondaryLabel(t){var e,i;if(!t||!(null===(e=this._hass)||void 0===e?void 0:e.states))return"";const o=this._hass.states[t];if(!o)return"";const r=null!==(i=o.attributes.unit_of_measurement)&&void 0!==i?i:"";return"W"===r?ft(_t(o.state),this._threshold()):"kW"===r?ft(1e3*_t(o.state),this._threshold()):r?`${o.state} ${r}`:o.state}_customPanel(t){var e,i,o,r,s,a,n,l,d;const c=t.entity,h=null===(e=this._hass)||void 0===e?void 0:e.states[c],p=_t(null==h?void 0:h.state),v=null!==(o=null===(i=null==h?void 0:h.attributes)||void 0===i?void 0:i.unit_of_measurement)&&void 0!==o?o:"",g=this._threshold(),u="W"===v||"kW"===v?ft(p,g):v?`${Number.isInteger(p)?p:p.toFixed(1)} ${v}`:`${Math.round(p)}`,y=null!==(r=t.color)&&void 0!==r?r:"#6366f1",f=null!==(n=null!==(s=t.name)&&void 0!==s?s:null===(a=null==h?void 0:h.attributes)||void 0===a?void 0:a.friendly_name)&&void 0!==n?n:c;return G`
      <stat-panel
        .entityId="${c}"
        .name="${f}"
        .icon="${"M7,2V13H10V22L17,10H13L17,2H7Z"}"
        .value="${p}"
        .displayValue="${u}"
        .stateLabel="${p>0?"Active":"Idle"}"
        .stateColor="${y}"
        .showSparkline="${!1!==(null===(l=this._config)||void 0===l?void 0:l.show_sparklines)}"
        .sparklineHistory="${null!==(d=this._sparklines[c])&&void 0!==d?d:[]}"
        .panelClass="panel--custom"
        .badgeClass="badge--custom"
      ></stat-panel>
    `}_deviceItems(){var t,e;return(null===(t=this._config)||void 0===t?void 0:t.devices)&&(null===(e=this._hass)||void 0===e?void 0:e.states)?this._config.devices.map(t=>{var e,i;return{entityId:t.entity,name:null!==(e=t.name)&&void 0!==e?e:t.entity,icon:null!==(i=t.icon)&&void 0!==i?i:"M7,2V13H10V22L17,10H13L17,2H7Z",watts:this._readEntity(t.entity),color:t.color}}):[]}_diagramDevices(){var t,e;return(null===(t=this._config)||void 0===t?void 0:t.devices)&&(null===(e=this._hass)||void 0===e?void 0:e.states)?this._config.devices.filter(t=>t.show_on_diagram).map(t=>{var e,i;return{name:null!==(e=t.name)&&void 0!==e?e:t.entity,watts:this._readEntity(t.entity),color:null!==(i=t.color)&&void 0!==i?i:"#6366f1"}}):[]}_panelProps(t,e,i,o,r,s){var a,n,l;const d=this._threshold(),c=this._config[t];return{entityId:s,name:null!==(a=null==c?void 0:c.name)&&void 0!==a?a:i,icon:o,value:e,displayValue:ft(e,d),stateLabel:bt(s,e),stateColor:r,showSparkline:!1!==(null===(n=this._config)||void 0===n?void 0:n.show_sparklines),sparklineHistory:null!==(l=this._sparklines[s])&&void 0!==l?l:[],panelClass:`panel--${t}`,badgeClass:`badge--${t}`}}render(){var t,e,i,o,r,s,a,n,l,d,c,h,p,v,g,u;if(!this._config)return G`<ha-card><div class="error-card">solar-overview-card: no config.</div></ha-card>`;if(this._error)return G`<ha-card><div class="error-card">Error: ${this._error}</div></ha-card>`;const y=this._threshold(),f=!1!==this._config.show_flow,_=!1!==this._config.show_stats,m=!1!==this._config.show_devices,b=this._panelProps("solar",this._solar,"Solar","M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M4,4V20H20V4H4M5,5H11V11H5V5M13,5H19V11H13V5M5,13H11V19H5V13M13,13H19V19H13V13Z","#f59e0b",this._config.solar.entity),$=this._panelProps("battery",this._battery,"Battery","M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z","#10b981",this._config.battery.entity),x=this._config.grid.entity?this._grid:this._flows.gridToHome+this._flows.gridToBattery-(this._flows.solarToGrid+this._flows.batteryToGrid),w=this._panelProps("grid",x,"Grid","M11.5,3.5L10.5,6H13.5L12.5,3.5H11.5M10,7L8.5,10H15.5L14,7H10M8,11L5,17H8L9,14H15L16,17H19L16,11H8M8,18L11,21H13L16,18H8Z","#8b5cf6",null!==(e=null!==(t=this._config.grid.entity)&&void 0!==t?t:this._config.grid.import_entity)&&void 0!==e?e:""),k=this._flows.solarToHome+this._flows.batteryToHome+this._flows.gridToHome,S=this._panelProps("load",k,"Home","M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z","#3b82f6",null!==(i=this._config.load.entity)&&void 0!==i?i:""),C=this._deviceItems();return G`
      <ha-card>
        <div class="card" theme="${null!==(o=this._config.theme)&&void 0!==o?o:"auto"}">

          ${f?G`
            <div class="flow-diagram">
              <flow-diagram
                .solar="${this._solar}"
                .battery="${this._battery}"
                .grid="${x}"
                .load="${k}"
                .socPercent="${this._soc}"
                .wattThreshold="${y}"
                .flows="${this._flows}"
                .diagramDevices="${this._diagramDevices()}"
                .solarName="${null!==(r=this._config.solar.name)&&void 0!==r?r:"Solar"}"
                .gridName="${null!==(s=this._config.grid.name)&&void 0!==s?s:"Grid"}"
                .homeName="${null!==(a=this._config.load.name)&&void 0!==a?a:"Home"}"
                .batteryName="${null!==(n=this._config.battery.name)&&void 0!==n?n:"Battery"}"
                .solarColor="${null!==(l=this._config.solar.color)&&void 0!==l?l:""}"
                .gridColor="${null!==(d=this._config.grid.color)&&void 0!==d?d:""}"
                .homeColor="${null!==(c=this._config.load.color)&&void 0!==c?c:""}"
                .batteryNodeColor="${null!==(h=this._config.battery.color)&&void 0!==h?h:""}"
                .backgroundImage="${null!==(p=this._config.flow_background)&&void 0!==p?p:""}"
                .textColor="${null!==(v=this._config.diagram_text_color)&&void 0!==v?v:"#ffffff"}"
                .nodeStyle="${null!==(g=this._config.node_style)&&void 0!==g?g:"circle"}"
                .showFlowLines="${!1!==this._config.show_flow_lines}"
                .nodePositions="${this._config.node_positions}"
                .solarSecondary="${this._secondaryLabel(this._config.solar.secondary_entity)}"
                .gridSecondary="${this._secondaryLabel(this._config.grid.secondary_entity)}"
                .homeSecondary="${this._secondaryLabel(this._config.load.secondary_entity)}"
                .batterySecondary="${this._secondaryLabel(this._config.battery.secondary_entity)}"
              ></flow-diagram>
            </div>
          `:""}

          ${_?G`
            <div class="stat-grid">
              ${(null!==(u=this._config.panels)&&void 0!==u?u:Ct).filter(t=>!1!==t.enabled).map(t=>{if(t.key){const e={solar:b,battery:$,grid:w,load:S}[t.key];return G`
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
                    `}return t.entity?this._customPanel(t):""})}
            </div>
          `:""}

          ${m&&this._config.devices&&this._config.devices.length>0?G`
            <div class="devices-section">
              <div class="devices-label">Devices</div>
              <device-row
                .devices="${C}"
                .wattThreshold="${y}"
              ></device-row>
            </div>
          `:""}

        </div>
      </ha-card>
    `}updated(t){super.updated(t)}};Ht.styles=[yt,a`:host { display: block; } ha-card { overflow: hidden; }`],t([ut()],Ht.prototype,"_config",void 0),t([ut()],Ht.prototype,"_solar",void 0),t([ut()],Ht.prototype,"_battery",void 0),t([ut()],Ht.prototype,"_grid",void 0),t([ut()],Ht.prototype,"_load",void 0),t([ut()],Ht.prototype,"_soc",void 0),t([ut()],Ht.prototype,"_solarExport",void 0),t([ut()],Ht.prototype,"_gridToBattery",void 0),t([ut()],Ht.prototype,"_flows",void 0),t([ut()],Ht.prototype,"_sparklines",void 0),t([ut()],Ht.prototype,"_error",void 0),Ht=t([ht("solar-overview-card")],Ht);let At=class extends dt{constructor(){super(...arguments),this._page="main",this._newDevice={entity:"",name:"",icon:"mdi:power-socket",color:"#6366f1",show_on_diagram:!1},this._editingIndex=null,this._editingDevice={entity:"",name:"",icon:"",color:"#6366f1",show_on_diagram:!1},this._newPanel={entity:"",name:"",color:"#6366f1"}}setConfig(t){this._config=t}_setValue(t,e){var i;if(!this._config)return;const o=t.split("."),r=JSON.parse(JSON.stringify(this._config)),s=r;if(2===o.length){const[t,r]=o,a={...null!==(i=s[t])&&void 0!==i?i:{}};""===e||null==e?delete a[r]:a[r]=e,s[t]=a}else""===e||null==e?delete s[o[0]]:s[o[0]]=e;this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:r}}))}_computeCurrentFlows(){if(!this.hass||!this._config)return null;try{const t=this._config,e=t.grid,i=t=>{var e;return t?_t(null===(e=this.hass.states[t])||void 0===e?void 0:e.state):0},o=i(t.solar.entity)*(t.solar.invert?-1:1),r=i(t.battery.entity)*(t.battery.invert?-1:1),s=i(t.load.entity)*(t.load.invert?-1:1),a=e.entity?i(e.entity)*(e.invert?-1:1):0,n=e.import_entity?i(e.import_entity):void 0,l=e.export_entity?i(e.export_entity):t.solar.export_entity?i(t.solar.export_entity):void 0,d=e.to_battery_entity?i(e.to_battery_entity):void 0,c=e.from_battery_entity?i(e.from_battery_entity):void 0;return mt({solar:o,battery:r,load:s,gridCombined:a,gridImport:n,gridExport:l,gridToBattery:d,batteryToGrid:c,gridBatteryCombined:e.battery_entity?i(e.battery_entity):void 0})}catch{return null}}_pageHeader(t,e){return G`
      <div class="page-header">
        <button class="back-btn" @click="${()=>{this._page="main",this._editingIndex=null}}">‹</button>
        <span class="page-icon">${t}</span>
        <span class="page-title">${e}</span>
      </div>
    `}_boolField(t,e,i){return G`
      <div class="bool-row">
        <span class="bool-label">${t}</span>
        <ha-selector
          .selector=${{boolean:{}}}
          .value="${i}"
          @value-changed="${t=>this._setValue(e,t.detail.value)}"
        ></ha-selector>
      </div>
    `}_entityField(t,e,i,o){var r,s;return G`
      <div class="field-wrap">
        <div class="field-row">
          <ha-selector
            .hass="${this.hass}"
            .label="${t}"
            .selector=${{entity:{}}}
            .value="${null!=i?i:""}"
            @value-changed="${t=>{var i;return this._setValue(e,null!==(i=t.detail.value)&&void 0!==i?i:"")}}"
          ></ha-selector>
          ${i?G`
            <button class="clear-btn" title="Clear" @click="${()=>this._setValue(e,"")}">✕</button>
          `:""}
        </div>
        ${void 0!==(null==o?void 0:o.namePath)?G`
          <div class="field-row" style="margin-top:4px;">
            <ha-selector
              .label="Display name"
              .selector=${{text:{}}}
              .value="${null!==(r=o.nameValue)&&void 0!==r?r:""}"
              @value-changed="${t=>{var e;return this._setValue(o.namePath,null!==(e=t.detail.value)&&void 0!==e?e:"")}}"
            ></ha-selector>
            ${o.nameValue?G`
              <button class="clear-btn" title="Clear" @click="${()=>this._setValue(o.namePath,"")}">✕</button>
            `:""}
          </div>
        `:""}
        ${(null==o?void 0:o.hint)?G`<p class="hint" style="margin:3px 0 0;">${o.hint}</p>`:""}
        ${void 0!==(null==o?void 0:o.invertPath)?this._boolField("Invert sign (flip +/−)",o.invertPath,null!==(s=o.invertValue)&&void 0!==s&&s):""}
      </div>
    `}_colorField(t,e,i,o){return G`
      <div class="color-row">
        <label>${t}</label>
        <input type="color"
          .value="${i||o}"
          @input="${t=>this._setValue(e,t.target.value)}"
        />
        ${i?G`
          <button class="clear-btn" title="Reset to default" @click="${()=>this._setValue(e,"")}">✕</button>
        `:""}
      </div>
    `}_textField(t,e,i){return G`
      <div class="field-row">
        <ha-selector
          .label="${t}"
          .selector=${{text:{}}}
          .value="${null!=i?i:""}"
          @value-changed="${t=>{var i;return this._setValue(e,null!==(i=t.detail.value)&&void 0!==i?i:"")}}"
        ></ha-selector>
        ${i?G`
          <button class="clear-btn" title="Clear" @click="${()=>this._setValue(e,"")}">✕</button>
        `:""}
      </div>
    `}_renderMain(){var t,e,i,o,r,s,a,n,l,d,c,h,p;if(!this._config)return G``;const v=this._config,g=null!==(e=null===(t=v.devices)||void 0===t?void 0:t.length)&&void 0!==e?e:0,u=(t,e,i,o,r)=>G`
      <div class="nav-item" @click="${()=>{this._page=t}}">
        <div class="nav-icon" style="background:${r}">${e}</div>
        <div class="nav-text">
          <div class="nav-title">${i}</div>
          <div class="nav-sub">${o}</div>
        </div>
        <span class="nav-arrow">›</span>
      </div>
    `,y=(null!==(i=v.panels)&&void 0!==i?i:Ct).filter(t=>!1!==t.enabled).length;return G`
      <div class="nav-list">
        ${u("setup","⚙️","Setup","Visibility & sparklines","rgba(107,114,128,0.18)")}
        ${u("solar","☀️","Solar",null!==(r=null===(o=v.solar)||void 0===o?void 0:o.entity)&&void 0!==r?r:"Not configured","rgba(245,158,11,0.18)")}
        ${u("battery","🔋","Battery",null!==(a=null===(s=v.battery)||void 0===s?void 0:s.entity)&&void 0!==a?a:"Not configured","rgba(16,185,129,0.18)")}
        ${u("grid","⚡","Grid",null!==(c=null!==(l=null===(n=v.grid)||void 0===n?void 0:n.entity)&&void 0!==l?l:null===(d=v.grid)||void 0===d?void 0:d.import_entity)&&void 0!==c?c:"Not configured","rgba(139,92,246,0.18)")}
        ${u("house","🏠","House",null!==(p=null===(h=v.load)||void 0===h?void 0:h.entity)&&void 0!==p?p:"Not configured","rgba(59,130,246,0.18)")}
        ${u("panels","📊","Panels",`${y} of 4 shown`,"rgba(6,182,212,0.18)")}
        ${u("outlets","🔌","Outlets",g>0?`${g} device${1!==g?"s":""}`:"No devices added","rgba(99,102,241,0.18)")}
        ${u("layout","🗺️","Layout","Drag nodes to reposition","rgba(16,185,129,0.18)")}
      </div>
    `}_renderSetupPage(){var t,e,i;if(!this._config)return G``;const o=this._config;return G`
      ${this._pageHeader("⚙️","Setup")}
      <div class="form-col">
        <div class="section-label" style="margin-top:0;">Sections</div>
        ${this._boolField("Show flow diagram","show_flow",!1!==o.show_flow)}
        ${this._boolField("Show stat panels","show_stats",!1!==o.show_stats)}
        ${this._boolField("Show devices row","show_devices",!1!==o.show_devices)}
        ${this._boolField("Show sparklines","show_sparklines",!1!==o.show_sparklines)}
        <div class="section-label">Flow diagram style</div>
        <div class="bool-row">
          <span class="bool-label">Node style</span>
          <ha-selector
            .selector=${{select:{options:["circle","card"],mode:"list"}}}
            .value="${null!==(t=o.node_style)&&void 0!==t?t:"circle"}"
            @value-changed="${t=>this._setValue("node_style",t.detail.value)}"
          ></ha-selector>
        </div>
        ${this._boolField("Show animated flow lines","show_flow_lines",!1!==o.show_flow_lines)}
        <div class="section-label">Flow diagram text</div>
        <div class="color-row">
          <label>Text colour</label>
          <input type="color"
            .value="${null!==(e=o.diagram_text_color)&&void 0!==e?e:"#ffffff"}"
            @input="${t=>this._setValue("diagram_text_color",t.target.value)}"
          />
          ${o.diagram_text_color&&"#ffffff"!==o.diagram_text_color?G`
            <button class="clear-btn" title="Reset to white" @click="${()=>this._setValue("diagram_text_color","")}">✕</button>
          `:""}
        </div>
        <p class="hint">Default: white. Applies to all node labels and values.</p>
        <div class="section-label">Flow diagram background</div>
        ${this._textField("Background image URL or /local/ path","flow_background",o.flow_background)}
        <p class="hint">e.g. /local/solar-bg.png or https://… — image fills diagram area.</p>
        <div class="section-label">Sparkline history</div>
        <ha-selector
          .label="Hours of history to display (default: 2)"
          .selector=${{number:{min:1,max:48,step:1,mode:"box"}}}
          .value="${null!==(i=o.sparkline_hours)&&void 0!==i?i:2}"
          @value-changed="${t=>this._setValue("sparkline_hours",t.detail.value)}"
        ></ha-selector>
        <p class="hint">Applies to all sparklines. Larger values fetch more history from HA.</p>
      </div>
    `}_renderSolarPage(){if(!this._config)return G``;const t=this._config.solar;return G`
      ${this._pageHeader("☀️","Solar Config")}
      <div class="form-col">
        ${this._entityField("Solar generation  (W ≥ 0)","solar.entity",null==t?void 0:t.entity,{invertPath:"solar.invert",invertValue:null==t?void 0:t.invert,namePath:"solar.name",nameValue:null==t?void 0:t.name})}
        ${this._entityField("Solar → Grid export  (W ≥ 0)","solar.export_entity",null==t?void 0:t.export_entity,{hint:"overrides grid.export_entity for Solar → Grid flow"})}
        <div class="section-label">Diagram node</div>
        ${this._colorField("Node colour","solar.color",null==t?void 0:t.color,"#f59e0b")}
        ${this._entityField("Secondary entity (shown below value on Solar node)","solar.secondary_entity",null==t?void 0:t.secondary_entity,{hint:"e.g. a second PV sensor or string total"})}
      </div>
    `}_renderBatteryPage(){if(!this._config)return G``;const t=this._config.battery;return G`
      ${this._pageHeader("🔋","Battery Config")}
      <div class="form-col">
        ${this._entityField("Battery power  (+ = charging,  − = discharging)","battery.entity",null==t?void 0:t.entity,{invertPath:"battery.invert",invertValue:null==t?void 0:t.invert,namePath:"battery.name",nameValue:null==t?void 0:t.name})}
        ${this._entityField("State of charge  (0–100 %)","battery.soc_entity",null==t?void 0:t.soc_entity)}
        <div class="section-label">Diagram node</div>
        ${this._colorField("Node colour (overrides SOC-based dynamic colour)","battery.color",null==t?void 0:t.color,"#10b981")}
        ${this._entityField("Secondary entity (shown below value on Battery node)","battery.secondary_entity",null==t?void 0:t.secondary_entity,{hint:"e.g. battery status or temperature"})}
      </div>
    `}_renderGridPage(){if(!this._config)return G``;const t=this._config.grid;return G`
      ${this._pageHeader("⚡","Grid Config")}
      <div class="form-col">
        <div class="section-label" style="margin-top:0;">Combined sensor (fallback)</div>
        ${this._entityField("Grid power  (+ = importing,  − = exporting)","grid.entity",null==t?void 0:t.entity,{invertPath:"grid.invert",invertValue:null==t?void 0:t.invert,namePath:"grid.name",nameValue:null==t?void 0:t.name})}
        <div class="section-label">Individual flow sensors</div>
        ${this._entityField("Grid → Home  import  (W ≥ 0)","grid.import_entity",null==t?void 0:t.import_entity,{hint:"overrides combined for Grid → Home"})}
        ${this._entityField("Solar/Battery → Grid  export  (W ≥ 0)","grid.export_entity",null==t?void 0:t.export_entity,{hint:"overrides combined for Solar → Grid"})}
        <div class="section-label">Battery ↔ Grid sensors</div>
        ${this._entityField("Grid ↔ Battery combined  (+ = charges,  − = discharges to grid)","grid.battery_entity",null==t?void 0:t.battery_entity)}
        ${this._entityField("Grid → Battery only  (W ≥ 0)","grid.to_battery_entity",null==t?void 0:t.to_battery_entity,{hint:"overrides battery_entity positive side"})}
        ${this._entityField("Battery → Grid only  (W ≥ 0)","grid.from_battery_entity",null==t?void 0:t.from_battery_entity,{hint:"overrides battery_entity negative side"})}
        <div class="section-label">Diagram node</div>
        ${this._colorField("Node colour","grid.color",null==t?void 0:t.color,"#8b5cf6")}
        ${this._entityField("Secondary entity (shown below value on Grid node)","grid.secondary_entity",null==t?void 0:t.secondary_entity,{hint:"e.g. frient meter or grid import sensor"})}
      </div>
    `}_renderHousePage(){var t;if(!this._config)return G``;const e=this._config.load,i=this._computeCurrentFlows(),o=null!==(t=this._config.watt_threshold)&&void 0!==t?t:1e3,r=t=>ft(t,o);return G`
      ${this._pageHeader("🏠","House Config")}
      <div class="form-col">
        ${this._entityField("Home consumption  (W ≥ 0)","load.entity",null==e?void 0:e.entity,{invertPath:"load.invert",invertValue:null==e?void 0:e.invert,namePath:"load.name",nameValue:null==e?void 0:e.name})}
        <div class="section-label">Diagram node</div>
        ${this._colorField("Node colour","load.color",null==e?void 0:e.color,"#3b82f6")}
        ${this._entityField("Secondary entity (shown below value on Home node)","load.secondary_entity",null==e?void 0:e.secondary_entity,{hint:"e.g. a sub-metered consumption sensor"})}
        ${i?G`
          <div class="section-label">Live flows (solar + battery + grid → house)</div>
          <div class="flow-stats">
            <div class="flow-stat">
              <span class="flow-stat-label">⚡ Grid → House</span>
              <span class="flow-stat-value">${r(i.gridToHome)}</span>
            </div>
            <div class="flow-stat">
              <span class="flow-stat-label">☀️ Solar → House</span>
              <span class="flow-stat-value">${r(i.solarToHome)}</span>
            </div>
            <div class="flow-stat">
              <span class="flow-stat-label">🔋 Battery → House</span>
              <span class="flow-stat-value">${r(i.batteryToHome)}</span>
            </div>
          </div>
        `:""}
      </div>
    `}_renderLayoutPage(){var t,e,i,o,r,s,a,n,l,d;if(!this._config)return G``;const c=this._config,h=c.grid,p=t=>{var e,i,o;return t?_t(null!==(o=null===(i=null===(e=this.hass)||void 0===e?void 0:e.states[t])||void 0===i?void 0:i.state)&&void 0!==o?o:"0"):0},v=p(c.solar.entity)*(c.solar.invert?-1:1),g=p(c.battery.entity)*(c.battery.invert?-1:1),u=p(null===(t=c.load)||void 0===t?void 0:t.entity),y=h.entity?p(h.entity)*(h.invert?-1:1):0,f=p(c.battery.soc_entity),_=(()=>{try{return mt({solar:v,battery:g,load:u,gridCombined:y,gridImport:h.import_entity?p(h.import_entity):void 0,gridExport:h.export_entity?p(h.export_entity):void 0,gridToBattery:h.to_battery_entity?p(h.to_battery_entity):void 0,batteryToGrid:h.from_battery_entity?p(h.from_battery_entity):void 0,gridBatteryCombined:h.battery_entity?p(h.battery_entity):void 0})}catch{return{solarToHome:0,solarToBattery:0,solarToGrid:0,gridToHome:0,batteryToHome:0,gridToBattery:0,batteryToGrid:0}}})(),m=!!c.node_positions&&Object.keys(c.node_positions).length>0;return G`
      ${this._pageHeader("🗺️","Layout")}
      <div class="form-col">
        <p class="hint" style="margin:0 0 8px;">Drag nodes to reposition. Changes save automatically.</p>
        <div style="border:1px solid var(--divider-color,rgba(255,255,255,0.1));border-radius:10px;overflow:hidden;">
          <flow-diagram
            .solar="${v}"
            .battery="${g}"
            .grid="${y}"
            .load="${u}"
            .socPercent="${f}"
            .wattThreshold="${null!==(e=c.watt_threshold)&&void 0!==e?e:1e3}"
            .flows="${_}"
            .solarName="${null!==(i=c.solar.name)&&void 0!==i?i:"Solar"}"
            .gridName="${null!==(o=c.grid.name)&&void 0!==o?o:"Grid"}"
            .homeName="${null!==(s=null===(r=c.load)||void 0===r?void 0:r.name)&&void 0!==s?s:"Home"}"
            .batteryName="${null!==(a=c.battery.name)&&void 0!==a?a:"Battery"}"
            .textColor="${null!==(n=c.diagram_text_color)&&void 0!==n?n:"#ffffff"}"
            .nodeStyle="${null!==(l=c.node_style)&&void 0!==l?l:"circle"}"
            .showFlowLines="${!1!==c.show_flow_lines}"
            .nodePositions="${c.node_positions}"
            .backgroundImage="${null!==(d=c.flow_background)&&void 0!==d?d:""}"
            .editMode="${!0}"
            @nodes-moved="${t=>this._setValue("node_positions",t.detail.positions)}"
          ></flow-diagram>
        </div>
        ${m?G`
          <button class="add-btn" style="align-self:flex-start;background:rgba(239,68,68,0.15);color:#ef4444;"
            @click="${()=>this._setValue("node_positions",void 0)}">
            Reset to default positions
          </button>
        `:""}
      </div>
    `}_renderPanelsPage(){var t;if(!this._config)return G``;const e=null!==(t=this._config.panels)&&void 0!==t?t:Ct,i={solar:{icon:"☀️",label:"Solar"},battery:{icon:"🔋",label:"Battery"},grid:{icon:"⚡",label:"Grid"},load:{icon:"🏠",label:"House"}};return G`
      ${this._pageHeader("📊","Stat Panels")}
      <div class="form-col">
        ${e.map((t,o)=>{var r,s,a;const n=!!t.key,l=n?i[t.key].icon:"📈",d=n?i[t.key].label:null!==(s=null!==(r=t.name)&&void 0!==r?r:t.entity)&&void 0!==s?s:"Custom",c=!n&&t.entity?G`<span class="nav-sub" style="margin:0;">${t.entity}</span>`:"";return G`
            <div class="panel-item">
              <div class="panel-move">
                <button class="move-btn" ?disabled="${0===o}"
                  @click="${()=>this._movePanel(o,-1)}">▲</button>
                <button class="move-btn" ?disabled="${o===e.length-1}"
                  @click="${()=>this._movePanel(o,1)}">▼</button>
              </div>
              ${n?G`<span style="font-size:1.1rem;">${l}</span>`:G`<span style="width:10px;height:10px;border-radius:50%;background:${null!==(a=t.color)&&void 0!==a?a:"#6366f1"};flex-shrink:0;"></span>`}
              <span class="panel-label" style="display:flex;flex-direction:column;gap:1px;">${d}${c}</span>
              ${n?"":G`
                <button class="device-btn danger" title="Remove" @click="${()=>this._removeCustomPanel(o)}">✕</button>
              `}
              <ha-selector
                .selector=${{boolean:{}}}
                .value="${t.enabled}"
                @value-changed="${t=>this._togglePanel(o,t.detail.value)}"
              ></ha-selector>
            </div>
          `})}

        <div class="section-label" style="margin-top:8px;">Add custom panel</div>
        <div class="add-device-form">
          <ha-selector .hass="${this.hass}" .label="Entity"
            .selector=${{entity:{}}} .value="${this._newPanel.entity}"
            @value-changed="${t=>{var e;this._newPanel={...this._newPanel,entity:null!==(e=t.detail.value)&&void 0!==e?e:""},this.requestUpdate()}}"
          ></ha-selector>
          <ha-selector .label="Name (optional)" .selector=${{text:{}}} .value="${this._newPanel.name}"
            @value-changed="${t=>{var e;this._newPanel={...this._newPanel,name:null!==(e=t.detail.value)&&void 0!==e?e:""},this.requestUpdate()}}"
          ></ha-selector>
          <div class="color-row">
            <label>Colour</label>
            <input type="color" .value="${this._newPanel.color}"
              @input="${t=>{this._newPanel={...this._newPanel,color:t.target.value},this.requestUpdate()}}"
            />
          </div>
          <div style="display:flex;justify-content:flex-end;">
            <button class="add-btn" ?disabled="${!this._newPanel.entity}" @click="${()=>this._addCustomPanel()}">Add Panel</button>
          </div>
        </div>

        <p class="hint">Reorder with ▲▼. Custom panels support any HA entity.</p>
      </div>
    `}_addCustomPanel(){var t;if(!this._config||!this._newPanel.entity)return;const e=[...null!==(t=this._config.panels)&&void 0!==t?t:Ct,{entity:this._newPanel.entity,name:this._newPanel.name||void 0,color:this._newPanel.color||"#6366f1",enabled:!0}];this._setPanels(e),this._newPanel={entity:"",name:"",color:"#6366f1"}}_removeCustomPanel(t){var e,i;const o=[...null!==(i=null===(e=this._config)||void 0===e?void 0:e.panels)&&void 0!==i?i:Ct];o.splice(t,1),this._setPanels(o)}_setPanels(t){this._config&&this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config,panels:t}}}))}_togglePanel(t,e){var i,o;const r=[...null!==(o=null===(i=this._config)||void 0===i?void 0:i.panels)&&void 0!==o?o:Ct];r[t]={...r[t],enabled:e},this._setPanels(r)}_movePanel(t,e){var i,o;const r=[...null!==(o=null===(i=this._config)||void 0===i?void 0:i.panels)&&void 0!==o?o:Ct],s=t+e;s<0||s>=r.length||([r[t],r[s]]=[r[s],r[t]],this._setPanels(r))}_startEdit(t){var e,i,o,r;const s=this._config.devices[t];this._editingDevice={entity:s.entity,name:null!==(e=s.name)&&void 0!==e?e:"",icon:null!==(i=s.icon)&&void 0!==i?i:"",color:null!==(o=s.color)&&void 0!==o?o:"#6366f1",show_on_diagram:null!==(r=s.show_on_diagram)&&void 0!==r&&r},this._editingIndex=t}_saveEdit(){var t;if(null===this._editingIndex||!this._config)return;const e=[...null!==(t=this._config.devices)&&void 0!==t?t:[]];e[this._editingIndex]={...this._editingDevice},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config,devices:e}}})),this._editingIndex=null}_cancelEdit(){this._editingIndex=null}_deleteDevice(t){var e;if(!this._config)return;const i=[...null!==(e=this._config.devices)&&void 0!==e?e:[]];i.splice(t,1),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config,devices:i}}}))}_addDevice(){var t;if(!this._config||!this._newDevice.entity)return;const e=[...null!==(t=this._config.devices)&&void 0!==t?t:[],{...this._newDevice}];this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...this._config,devices:e}}})),this._newDevice={entity:"",name:"",icon:"mdi:power-socket",color:"#6366f1",show_on_diagram:!1}}_deviceForm(t,e,i,o,r){return G`
      <ha-selector .hass="${this.hass}" .label="Entity"
        .selector=${{entity:{}}} .value="${t.entity}"
        @value-changed="${t=>{var i;return e({entity:null!==(i=t.detail.value)&&void 0!==i?i:""})}}"
      ></ha-selector>

      <div class="add-device-row">
        <ha-selector .label="Name" .selector=${{text:{}}} .value="${t.name}"
          @value-changed="${t=>{var i;return e({name:null!==(i=t.detail.value)&&void 0!==i?i:""})}}"
        ></ha-selector>
        <ha-selector .label="Icon" .selector=${{icon:{}}} .value="${t.icon}"
          @value-changed="${t=>{var i;return e({icon:null!==(i=t.detail.value)&&void 0!==i?i:""})}}"
        ></ha-selector>
      </div>

      <div class="color-row">
        <label>Colour</label>
        <input type="color" .value="${t.color}"
          @input="${t=>e({color:t.target.value})}"
        />
      </div>

      <div class="bool-row">
        <span class="bool-label">Show on flow diagram</span>
        <ha-selector
          .selector=${{boolean:{}}} .value="${t.show_on_diagram}"
          @value-changed="${t=>e({show_on_diagram:t.detail.value})}"
        ></ha-selector>
      </div>

      <div style="display:flex;gap:8px;justify-content:flex-end;">
        ${r?G`<button class="add-btn" style="background:rgba(255,255,255,0.1);color:var(--primary-text-color);" @click="${r}">Cancel</button>`:""}
        <button class="add-btn" ?disabled="${!t.entity}" @click="${o}">${i}</button>
      </div>
    `}_renderOutletsPage(){var t,e;const i=null!==(e=null===(t=this._config)||void 0===t?void 0:t.devices)&&void 0!==e?e:[];return G`
      ${this._pageHeader("🔌","Outlets / Devices")}

      ${i.length>0?G`
        <div class="device-list">
          ${i.map((t,e)=>{var i,o;return G`
            <div>
              <div class="device-item">
                <div class="device-item-color" style="background:${null!==(i=t.color)&&void 0!==i?i:"#6366f1"}"></div>
                <div style="flex:1;min-width:0;">
                  <div class="device-item-name">
                    ${null!==(o=t.name)&&void 0!==o?o:t.entity}
                    ${t.show_on_diagram?G`<span class="diagram-badge">diagram</span>`:""}
                  </div>
                  <div class="device-item-entity">${t.entity}</div>
                </div>
                <div class="device-actions">
                  <button class="device-btn"
                    @click="${()=>this._editingIndex===e?this._cancelEdit():this._startEdit(e)}">
                    ${this._editingIndex===e?"Cancel":"Edit"}
                  </button>
                  <button class="device-btn danger" @click="${()=>this._deleteDevice(e)}">✕</button>
                </div>
              </div>
              ${this._editingIndex===e?G`
                <div class="device-edit-form">
                  ${this._deviceForm(this._editingDevice,t=>{this._editingDevice={...this._editingDevice,...t},this.requestUpdate()},"Save",()=>this._saveEdit(),()=>this._cancelEdit())}
                </div>
              `:""}
            </div>
          `})}
        </div>
      `:G`<p class="hint">No devices added yet.</p>`}

      <div class="add-device-form">
        <div class="section-label" style="margin-top:0;">Add device</div>
        ${this._deviceForm(this._newDevice,t=>{this._newDevice={...this._newDevice,...t},this.requestUpdate()},"Add Device",()=>this._addDevice())}
      </div>
    `}render(){if(!this._config)return G``;switch(this._page){case"setup":return this._renderSetupPage();case"solar":return this._renderSolarPage();case"battery":return this._renderBatteryPage();case"grid":return this._renderGridPage();case"house":return this._renderHousePage();case"panels":return this._renderPanelsPage();case"outlets":return this._renderOutletsPage();case"layout":return this._renderLayoutPage();default:return this._renderMain()}}};At.styles=a`
    :host { display: block; padding: 16px; }

    /* ── Navigation cards ── */
    .nav-list { display: flex; flex-direction: column; gap: 8px; }
    .nav-item {
      display: flex; align-items: center; gap: 14px;
      padding: 13px 14px; border-radius: 10px; cursor: pointer;
      background: var(--card-background-color, rgba(255,255,255,0.04));
      border: 1px solid var(--divider-color, rgba(255,255,255,0.08));
      transition: background 0.12s;
    }
    .nav-item:hover { background: rgba(255,255,255,0.09); }
    .nav-icon {
      width: 38px; height: 38px; border-radius: 9px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
    }
    .nav-text { flex: 1; min-width: 0; }
    .nav-title { font-size: 0.88rem; font-weight: 600; color: var(--primary-text-color); }
    .nav-sub {
      font-size: 0.73rem; color: var(--secondary-text-color, #9ca3af);
      margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .nav-arrow { color: var(--secondary-text-color, #9ca3af); font-size: 1.1rem; padding-right: 2px; }

    /* ── Page layout ── */
    .page-header {
      display: flex; align-items: center; gap: 10px; margin-bottom: 18px;
    }
    .back-btn {
      background: none; border: none; cursor: pointer; padding: 4px 8px;
      color: var(--primary-color, #3b82f6); font-size: 1.3rem; border-radius: 6px;
      display: flex; align-items: center; line-height: 1;
    }
    .back-btn:hover { background: rgba(59,130,246,0.1); }
    .page-title { font-size: 1rem; font-weight: 700; color: var(--primary-text-color); }
    .page-icon  { font-size: 1.15rem; }

    /* ── Form fields ── */
    .form-col { display: flex; flex-direction: column; gap: 12px; }
    .field-wrap { display: flex; flex-direction: column; gap: 6px; }
    .field-row { display: flex; align-items: flex-end; gap: 6px; }
    .field-row ha-selector { flex: 1; min-width: 0; }
    .clear-btn {
      background: none; border: none; cursor: pointer;
      color: var(--secondary-text-color, #9ca3af);
      padding: 8px 7px; border-radius: 6px; font-size: 0.95rem;
      line-height: 1; flex-shrink: 0; margin-bottom: 2px;
    }
    .clear-btn:hover { color: #ef4444; background: rgba(239,68,68,0.1); }
    .section-label {
      font-size: 0.73rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.07em; color: var(--secondary-text-color, #9ca3af);
      margin: 6px 0 0;
    }
    .divider { height: 1px; background: var(--divider-color, rgba(255,255,255,0.08)); margin: 10px 0; }
    .hint { font-size: 0.75rem; color: var(--secondary-text-color, #9ca3af); margin: 4px 0 0; }

    /* ── Boolean toggle row ── */
    .bool-row {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      padding: 6px 10px; border-radius: 8px;
      background: var(--card-background-color, rgba(255,255,255,0.04));
      border: 1px solid var(--divider-color, rgba(255,255,255,0.08));
    }
    .bool-label { font-size: 0.875rem; color: var(--primary-text-color); flex: 1; }

    /* ── Live flow stats (house page) ── */
    .flow-stats { display: flex; flex-direction: column; gap: 4px; }
    .flow-stat {
      display: flex; justify-content: space-between; align-items: center;
      padding: 7px 10px; border-radius: 7px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.07);
    }
    .flow-stat-label { font-size: 0.82rem; color: var(--secondary-text-color, #9ca3af); }
    .flow-stat-value { font-size: 0.87rem; font-weight: 700; color: var(--primary-text-color); }

    /* ── Stat panel order/toggle ── */
    .panel-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px; border-radius: 8px;
      background: var(--card-background-color, rgba(255,255,255,0.04));
      border: 1px solid var(--divider-color, rgba(255,255,255,0.08));
    }
    .panel-move { display: flex; flex-direction: column; gap: 2px; }
    .move-btn {
      background: none; border: none; cursor: pointer; padding: 2px 6px;
      color: var(--secondary-text-color, #9ca3af); border-radius: 4px;
      font-size: 0.75rem; line-height: 1;
    }
    .move-btn:hover:not([disabled]) { background: rgba(255,255,255,0.1); color: var(--primary-text-color); }
    .move-btn[disabled] { opacity: 0.2; cursor: not-allowed; }
    .panel-label { flex: 1; font-size: 0.875rem; color: var(--primary-text-color); }

    /* ── Device list ── */
    .device-list { display: flex; flex-direction: column; gap: 6px; }
    .device-item {
      display: flex; align-items: center; gap: 8px;
      background: rgba(255,255,255,0.04); border-radius: 8px; padding: 8px 10px;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .device-item-color { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
    .device-item-name  { flex: 1; font-size: 0.85rem; }
    .device-item-entity { font-size: 0.72rem; color: var(--secondary-text-color, #9ca3af); }
    .device-actions { display: flex; gap: 4px; }
    .device-btn {
      background: none; border: none; cursor: pointer; padding: 4px 7px;
      color: var(--secondary-text-color, #9ca3af); border-radius: 4px;
      font-size: 0.78rem; font-weight: 600; line-height: 1;
    }
    .device-btn:hover { background: rgba(255,255,255,0.08); }
    .device-btn.danger:hover { color: #ef4444; }
    .device-edit-form {
      display: flex; flex-direction: column; gap: 8px;
      background: rgba(255,255,255,0.04); border-radius: 8px;
      padding: 10px; margin-top: 4px;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .diagram-badge {
      font-size: 0.65rem; font-weight: 600; padding: 1px 5px;
      border-radius: 99px; background: rgba(99,102,241,0.2); color: #818cf8;
      margin-left: 4px;
    }
    .add-device-form {
      display: flex; flex-direction: column; gap: 8px;
      background: rgba(255,255,255,0.03); border-radius: 8px; padding: 12px;
      border: 1px dashed rgba(255,255,255,0.12); margin-top: 8px;
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
  `,t([gt({attribute:!1})],At.prototype,"hass",void 0),t([ut()],At.prototype,"_config",void 0),t([ut()],At.prototype,"_page",void 0),t([ut()],At.prototype,"_newDevice",void 0),t([ut()],At.prototype,"_editingIndex",void 0),t([ut()],At.prototype,"_editingDevice",void 0),t([ut()],At.prototype,"_newPanel",void 0),At=t([ht("solar-overview-card-editor")],At),window.customCards=window.customCards||[],window.customCards.push({type:"solar-overview-card",name:"Solar Overview Card",description:"Animated solar energy overview with power flow diagram",preview:!0});export{Ht as SolarOverviewCard,At as SolarOverviewCardEditor};
