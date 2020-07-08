(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{131:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return o})),n.d(t,"default",(function(){return c}));var a=n(1),r=(n(0),n(164));const l={title:"selectorFamily(options)",sidebar_label:"selectorFamily()"},i={id:"api-reference/utils/selectorFamily",title:"selectorFamily(options)",description:"Returns a function that returns a read-only `RecoilValueReadOnly` or writeable `RecoilState` selector.",source:"@site/docs/api-reference/utils/selectorFamily.md",permalink:"/docs/api-reference/utils/selectorFamily",editUrl:"https://github.com/facebookexperimental/Recoil/edit/docs/docs/docs/api-reference/utils/selectorFamily.md",sidebar_label:"selectorFamily()",sidebar:"someSidebar",previous:{title:"atomFamily(options)",permalink:"/docs/api-reference/utils/atomFamily"},next:{title:"constSelector(constant)",permalink:"/docs/api-reference/utils/constSelector"}},o=[{value:"Example",id:"example",children:[]},{value:"Async Query Example",id:"async-query-example",children:[]},{value:"Destructuring Example",id:"destructuring-example",children:[]}],s={rightToc:o};function c({components:e,...t}){return Object(r.b)("wrapper",Object(a.a)({},s,t,{components:e,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Returns a function that returns a read-only ",Object(r.b)("inlineCode",{parentName:"p"},"RecoilValueReadOnly")," or writeable ",Object(r.b)("inlineCode",{parentName:"p"},"RecoilState")," selector."),Object(r.b)("p",null,"A ",Object(r.b)("inlineCode",{parentName:"p"},"selectorFamily")," is a powerful pattern that is similar to a ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/api-reference/core/selector"}),Object(r.b)("inlineCode",{parentName:"a"},"selector")),", but allows you to pass parameters to the ",Object(r.b)("inlineCode",{parentName:"p"},"get")," and ",Object(r.b)("inlineCode",{parentName:"p"},"set")," callbacks of a ",Object(r.b)("inlineCode",{parentName:"p"},"selector"),".  The ",Object(r.b)("inlineCode",{parentName:"p"},"selectorFamily()")," utility returns a function which can be called with user-defined parameters and returns a selector. Each unique parameter value will return the same memoized selector instance."),Object(r.b)("hr",null),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"function selectorFamily<T, Parameter>({\n  key: string,\n\n  get: Parameter => ({get: GetRecoilValue}) => Promise<T> | RecoilValue<T> | T,\n\n  dangerouslyAllowMutability?: boolean,\n}): RecoilValueReadOnly<T>\n")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"function selectorFamily<T, Parameter>({\n  key: string,\n\n  get: Parameter => ({get: GetRecoilValue}) => Promise<T> | RecoilValue<T> | T,\n\n  set: Parameter => (\n    {\n      get: GetRecoilValue,\n      set: SetRecoilValue,\n      reset: ResetRecoilValue,\n    },\n    newValue: T | DefaultValue,\n  ) => void,\n\n  dangerouslyAllowMutability?: boolean,\n}): RecoilState<T>\n")),Object(r.b)("p",null,"Where"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"type ValueOrUpdater<T> =  T | DefaultValue | ((prevValue: T) => T | DefaultValue);\ntype GetRecoilValue = <T>(RecoilValue<T>) => T;\ntype SetRecoilValue = <T>(RecoilState<T>, ValueOrUpdater<T>) => void;\ntype ResetRecoilValue = <T>(RecoilState<T>) => void;\n")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"key")," - A unique string used to identify the atom internally. This string should be unique with respect to other atoms and selectors in the entire application."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"get")," - A function that is passed an object of named callbacks that returns the value of the selector, the same as the ",Object(r.b)("inlineCode",{parentName:"li"},"selector()")," interface. This is wrapped by a function which is passed the parameter from calling the selector family function."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"set?")," - An optional function that will produce writeable selectors when provided. It should be a function that takes an object of named callbacks, same as the ",Object(r.b)("inlineCode",{parentName:"li"},"selector()")," interface. This is again wrapped by another function with gets the parameters from calling the selector family function.")),Object(r.b)("hr",null),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"selectorFamily")," essentially provides a map from the parameter to a selector.  Because the parameters are often generated at the callsites using the family, and we want equivalent parameters to re-use the same underlying selector, it uses value-equality by default instead of reference-equality.  (There is an unstable ",Object(r.b)("inlineCode",{parentName:"p"},"cacheImplementationForParams")," API to adjust this behavior).  This imposes restrictions on the types which can be used for the parameter.  Please use a primitive type or an object that can be serialized.  Recoil uses a custom serializer that can support objects and arrays, some containers (such as ES6 Sets and Maps), is invariant of object key ordering, supports Symbols, Iterables, and uses ",Object(r.b)("inlineCode",{parentName:"p"},"toJSON")," properties for custom serialization (such as provided with libraries like Immutable containers).  Using functions or mutable objects, such as Promises, in parameters is problematic."),Object(r.b)("h2",{id:"example"},"Example"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"const myNumberState = atom({\n  key: 'MyNumber',\n  default: 2,\n});\n\nconst myMultipliedState = selectorFamily({\n  key: 'MyMultipliedNumber',\n  get: (multiplier) => ({get}) => {\n    return get(myNumberState) * multiplier;\n  },\n\n  // optional set\n  set: (multiplier) => ({set}, newValue) => {\n    set(myNumberState, newValue / multiplier);\n  },\n});\n\nfunction MyComponent() {\n  // defaults to 2\n  const number = useRecoilValue(myNumberState);\n\n  // defaults to 200\n  const multipliedNumber = useRecoilValue(myMultipliedState(100));\n\n  return <div>...</div>;\n}\n")),Object(r.b)("h2",{id:"async-query-example"},"Async Query Example"),Object(r.b)("p",null,'Selector Families are also useful to use for passing parameters to queries.  Note that using a selector to abstract queries like this should still be "pure" functions which always return the same result for a given set of inputs and dependency values.  See ',Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/guides/asynchronous-data-queries"}),"this guide")," for more examples."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"const myDataQuery = selectorFamily({\n  key: 'MyDataQuery',\n  get: (queryParameters) => async ({get}) => {\n    const response = await asyncDataRequest(queryParameters);\n    if (response.error) {\n      throw response.error;\n    }\n    return response.data;\n  },\n});\n\nfunction MyComponent() {\n  const data = useRecoilValue(myDataQuery({userID: 132}));\n  return <div>...</div>;\n}\n")),Object(r.b)("h2",{id:"destructuring-example"},"Destructuring Example"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx"}),"const formState = atom({\n  key: 'formState',\n  default: {\n    field1: \"1\",\n    field2: \"2\",\n    field3: \"3\",\n  },\n});\n\nconst formFieldState = selectorFamily({\n  key: 'FormField',\n  get: field => ({get}) => get(formState)[field],\n  set: field => ({set}, newValue) =>\n    set(formState, prevState => {...prevState, [field]: newValue}),\n});\n\nconst Component1 = () => {\n  const [value, onChange] = useRecoilState(formFieldState('field1'));\n  return (\n    <input value={value} onChange={onChange} />\n    <Component2 />\n  )\n}\n\nconst Component2 = () => {\n  const [value, onChange] = useRecoilState(formFieldState('field2'));\n  return (\n    <input value={value} onChange={onChange} />\n  )\n}\n")))}c.isMDXComponent=!0},164:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),u=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o({},t,{},e)),n},p=function(e){var t=u(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=u(n),b=a,d=p["".concat(i,".").concat(b)]||p[b]||m[b]||l;return n?r.a.createElement(d,o({ref:t},c,{components:n})):r.a.createElement(d,o({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,i=new Array(l);i[0]=b;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var c=2;c<l;c++)i[c]=n[c];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);