if(!self.define){let e,i={};const a=(a,n)=>(a=new URL(a+".js",n).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,s)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let r={};const d=e=>a(e,c),o={module:{uri:c},exports:r,require:d};i[c]=Promise.all(n.map((e=>o[e]||d(e)))).then((e=>(s(...e),r)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/E5QIGx5WW8qdn5OidvTBb/_buildManifest.js",revision:"846dc2e339230407093f05b3f22c4f7f"},{url:"/_next/static/E5QIGx5WW8qdn5OidvTBb/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e762574-50b930cf53d0e910.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/1345-4a8debf274dbaf4b.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/164f4fb6-994f885ad5e556fd.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/2170a4aa-e8119a156080ca52.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/2868-979d73ff66417023.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/3314-cf1cfed45619a8c1.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/3556-0f9122e8a1c1807f.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/370b0802-523327682c16e4d6.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/3756.87b75b1e9f03a562.js",revision:"87b75b1e9f03a562"},{url:"/_next/static/chunks/3d47b92a-4f3be2306843e56d.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/4594-0ec90621814e164f.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/4bd1b696-d70b94a27b4c4408.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/5007-2431be0ec75d3d0c.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/5203.7c54c202406d4620.js",revision:"7c54c202406d4620"},{url:"/_next/static/chunks/5589-93dbfebad4e3b0bb.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/59650de3-03dca90195c95558.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/5974-9f02c45ff1ba5cb7.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/5e22fd23-0003d544a978fd34.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/6218.2a359a0f55d6ba39.js",revision:"2a359a0f55d6ba39"},{url:"/_next/static/chunks/6735.dce668de27a428b7.js",revision:"dce668de27a428b7"},{url:"/_next/static/chunks/6897-86e1c2b769bf5320.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/7455-ae286cccb5a59ae4.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/795d4814-63436fc970f36714.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/8173-34b8572febff2953.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/8e1d74a4-62da446b568a2d09.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/9145-d8adf247b4114c05.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/9153-8033ad789b3f1ac5.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/9253-9c09bf748038721d.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/9839.38024ae88c1de292.js",revision:"38024ae88c1de292"},{url:"/_next/static/chunks/ad2866b8.ee5588e8eda62a42.js",revision:"ee5588e8eda62a42"},{url:"/_next/static/chunks/app/(auth-pages)/forgot-password/page-06bf278750bbdcda.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/(auth-pages)/layout-6eab3772214afc7f.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/(auth-pages)/reset-password/page-60883fe42dccb52e.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/(auth-pages)/sign-in/page-3f3b6c72705332fe.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/_not-found/page-99a317d1c38aba39.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/api/category/add/route-c3ef6f2740501709.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/api/category/delete/route-95990c36c69920ae.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/api/category/edit/route-fec5e233d260a119.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/api/item/add/route-7b0533dcb7216699.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/api/item/delete/route-653078c0cfc280c4.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/api/item/edit/route-1eabe9588ab06d22.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/api/item/update/route-b041b4fc344b3281.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/api/transaction/add/route-5a2cc399778e85c1.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/api/transaction/edit/route-3dd87abc537a4eb2.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/api/transaction/fetchHistory/route-b39420d44781ce79.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/api/user/loaupdate/route-790e269d7a6455aa.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/api/user/update/route-73be7b8ea4c12643.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/auth/callback/route-c09d2c52ead548e4.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/layout-e3c96ce80505eba2.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/page-50e1680247e5d516.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/protected/billing/page-cb42f94300aab562.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/protected/dashboard/page-a85cc06f235e99d3.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/protected/inventory/page-fac6291ff454e962.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/protected/loading-e81e69a1ff75469f.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/protected/new-order/page-07b0bd32375f61f9.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/protected/notifications/page-a02692f79bab166a.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/protected/orders/page-a4b0b8c73e9fb05b.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/protected/page-2c9cfb4234e309f5.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/protected/profile/page-a613d754c0492cff.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/protected/reports/page-ebc5a2dac3384655.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/protected/reset-password/page-d6c599becd5c9072.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/protected/settings/page-fcc6a834e838be93.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/app/protected/staff/page-3ccb7c8c77c9ca1f.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/bc98253f.63ca06ab087b2181.js",revision:"63ca06ab087b2181"},{url:"/_next/static/chunks/ca377847-b5dff6c264c6ba52.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/ee560e2c-d2b26026e407a688.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/f97e080b-025ce2967718111e.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/framework-c8065bab8b311d0e.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/main-09dd4944c971a054.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/main-app-c625b09dbba2cec0.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/pages/_app-bfa3536d2730ca09.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/pages/_error-cb90f27adf2fb914.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-fed70ff372ff35c4.js",revision:"E5QIGx5WW8qdn5OidvTBb"},{url:"/_next/static/css/cd6ad1909ef0b1ba.css",revision:"cd6ad1909ef0b1ba"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/_next/static/media/logo.f43290a4.png",revision:"1a41100b45ea1ad231b280dcdcf0774f"},{url:"/android/android-launchericon-144-144.png",revision:"59c77a9e52c8a13d84723248d020d92b"},{url:"/android/android-launchericon-192-192.png",revision:"bd8d087e58b01f40200c8f5139a46ce3"},{url:"/android/android-launchericon-48-48.png",revision:"c91566132747847b8c363cd8ff6b5219"},{url:"/android/android-launchericon-512-512.png",revision:"94c42823395af32a5c8b12c30a037010"},{url:"/android/android-launchericon-72-72.png",revision:"e759e5bc5dcecf1f65fd958f87c3c83e"},{url:"/android/android-launchericon-96-96.png",revision:"807eaf30f527d1914bee026dc37588b3"},{url:"/icons.json",revision:"5dbbc3fe59816e65ba28e355a58ea45c"},{url:"/ios/100.png",revision:"4fd259670dfe4955c4414570a3f41393"},{url:"/ios/1024.png",revision:"183f6a58929f9183b82a8ee60483e300"},{url:"/ios/114.png",revision:"a2596126fc85375e393815e92ce712cc"},{url:"/ios/120.png",revision:"2a58b18a61bfe4c7a0f69856fd7c1924"},{url:"/ios/128.png",revision:"6e01c3749718e56a5ea2a087c1de5ec2"},{url:"/ios/144.png",revision:"59c77a9e52c8a13d84723248d020d92b"},{url:"/ios/152.png",revision:"5d7bcecf6c3cca353cd33ac203721677"},{url:"/ios/16.png",revision:"26896218aa6ee21b045417a7e1498bb3"},{url:"/ios/167.png",revision:"8d42d42e79a442ab0cf873b4df2037f7"},{url:"/ios/180.png",revision:"1dbb0fbf2e5861f0faa5b41e9b8d28af"},{url:"/ios/192.png",revision:"bd8d087e58b01f40200c8f5139a46ce3"},{url:"/ios/20.png",revision:"3a02694064c07835b091d2ef6c85c3d0"},{url:"/ios/256.png",revision:"864c98bfdcfbb5752c6f172bdda091d1"},{url:"/ios/29.png",revision:"2fbdb2b0c9a57d3c2459193440da4bc9"},{url:"/ios/32.png",revision:"e1ab269f29ce95ea0fa8ac1377ec5c5b"},{url:"/ios/40.png",revision:"47dfb3eaec771c73b89eb16ffea6670e"},{url:"/ios/50.png",revision:"beb1a5bd8693e52ef4ca395d91745cab"},{url:"/ios/512.png",revision:"94c42823395af32a5c8b12c30a037010"},{url:"/ios/57.png",revision:"e32b96652502b1e67ee494c146a6f644"},{url:"/ios/58.png",revision:"53b46c27666aef76d0351ffb3f52b51b"},{url:"/ios/60.png",revision:"05eb6f4e1402058df418767de9712b22"},{url:"/ios/64.png",revision:"0e04dc65b893e41d9e670176aa742ee3"},{url:"/ios/72.png",revision:"e759e5bc5dcecf1f65fd958f87c3c83e"},{url:"/ios/76.png",revision:"362e6a514c86dbb04251baaccdb3653c"},{url:"/ios/80.png",revision:"fe48473da6109a13e55ac74a5675e1bf"},{url:"/ios/87.png",revision:"cd38d698f9f788a9ae04a55ae50b91d4"},{url:"/manifest.json",revision:"930a5e8c72b664496a945929ed3658c6"},{url:"/windows11/LargeTile.scale-100.png",revision:"c353956c053e14aaa19772d46ce3b417"},{url:"/windows11/LargeTile.scale-125.png",revision:"3871a6766f8eb8c5754a99883ee8b8c9"},{url:"/windows11/LargeTile.scale-150.png",revision:"0d21169c1bddbc8deaf1459da6fe74f4"},{url:"/windows11/LargeTile.scale-200.png",revision:"797eb8c4f83aa9a35b085c1777aabcd5"},{url:"/windows11/LargeTile.scale-400.png",revision:"4c1b63264a07168cf859ec97dbdbbe3a"},{url:"/windows11/SmallTile.scale-100.png",revision:"6b463599bbf047630e208a13691b0c25"},{url:"/windows11/SmallTile.scale-125.png",revision:"b6dba4dba7905d2b61bc69ada6fe3984"},{url:"/windows11/SmallTile.scale-150.png",revision:"756940b1cc851bf5e03465ddaf28b3c2"},{url:"/windows11/SmallTile.scale-200.png",revision:"53f79648d02d45512e979d13fb4e9e68"},{url:"/windows11/SmallTile.scale-400.png",revision:"58ebab30af118c423bc4a1d70eac0f58"},{url:"/windows11/SplashScreen.scale-100.png",revision:"860280df3cafe409338e3cc42e9e6545"},{url:"/windows11/SplashScreen.scale-125.png",revision:"406b967a6e10b559f8aa08a780fb4cb1"},{url:"/windows11/SplashScreen.scale-150.png",revision:"76f2f932fe32a8301d23fb595c6c8b45"},{url:"/windows11/SplashScreen.scale-200.png",revision:"ef72cf1d1b4ca5a82c69c8af2133aef1"},{url:"/windows11/SplashScreen.scale-400.png",revision:"a56a0ee61e8cfda2de7bbd152df614cb"},{url:"/windows11/Square150x150Logo.scale-100.png",revision:"ebd92da3453c1759859b06f7be38d3bc"},{url:"/windows11/Square150x150Logo.scale-125.png",revision:"e312378d0494eefeaa6a0d2ad94572ff"},{url:"/windows11/Square150x150Logo.scale-150.png",revision:"0cbc758aa27f7690f3f843e43fc4ad2f"},{url:"/windows11/Square150x150Logo.scale-200.png",revision:"48b577d278b754b27fca1cee072153b2"},{url:"/windows11/Square150x150Logo.scale-400.png",revision:"42ca9312ac29ebe87a307748b2d2b244"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"659cf9c787cd0cdc697958bf07c84df6"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"6f3c9d1670d8bf8e778cb3f8c4770152"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"582127973508bac7e7c49668cc992051"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"b8824ae6ab541cb1228a49c52f443fd0"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"bc97d76d6cb7ae92441252c6fc2bb0ca"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"fc593c8d49633664143c3c8f36683b12"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"6b27bf0be89dada5e5fe91bef9a26d99"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"96382e9a1849fa02a998806c2a9eaa33"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"dde8fee1c8eeff37655f4828801af60d"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"95ae4d69acd55eed5572f24ed72c8004"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"0aa9ac5148f3899312612765b719abe6"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"a871bafb48d60c993b27f9426a87c126"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"30961eff965b2e4140e5fb7ceaf4841b"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"854bc8e7cecac0116d24a1a2cd00411b"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"8c5d1eca12055967f0e21886efde4d0c"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"659cf9c787cd0cdc697958bf07c84df6"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"6f3c9d1670d8bf8e778cb3f8c4770152"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"582127973508bac7e7c49668cc992051"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"b8824ae6ab541cb1228a49c52f443fd0"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"bc97d76d6cb7ae92441252c6fc2bb0ca"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"fc593c8d49633664143c3c8f36683b12"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"6b27bf0be89dada5e5fe91bef9a26d99"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"96382e9a1849fa02a998806c2a9eaa33"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"dde8fee1c8eeff37655f4828801af60d"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"95ae4d69acd55eed5572f24ed72c8004"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"0aa9ac5148f3899312612765b719abe6"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"a871bafb48d60c993b27f9426a87c126"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"30961eff965b2e4140e5fb7ceaf4841b"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"854bc8e7cecac0116d24a1a2cd00411b"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"8c5d1eca12055967f0e21886efde4d0c"},{url:"/windows11/Square44x44Logo.scale-100.png",revision:"dde8fee1c8eeff37655f4828801af60d"},{url:"/windows11/Square44x44Logo.scale-125.png",revision:"5a0d4648945fb7cd037143bfd3bbc117"},{url:"/windows11/Square44x44Logo.scale-150.png",revision:"2bf70a29e44415dbb6fc027ada22a0b1"},{url:"/windows11/Square44x44Logo.scale-200.png",revision:"e7b935979e14ee46019eb4248850b7e6"},{url:"/windows11/Square44x44Logo.scale-400.png",revision:"8885cb0948dd6c3405ce0d87c5fd8b1c"},{url:"/windows11/Square44x44Logo.targetsize-16.png",revision:"659cf9c787cd0cdc697958bf07c84df6"},{url:"/windows11/Square44x44Logo.targetsize-20.png",revision:"6f3c9d1670d8bf8e778cb3f8c4770152"},{url:"/windows11/Square44x44Logo.targetsize-24.png",revision:"582127973508bac7e7c49668cc992051"},{url:"/windows11/Square44x44Logo.targetsize-256.png",revision:"b8824ae6ab541cb1228a49c52f443fd0"},{url:"/windows11/Square44x44Logo.targetsize-30.png",revision:"bc97d76d6cb7ae92441252c6fc2bb0ca"},{url:"/windows11/Square44x44Logo.targetsize-32.png",revision:"fc593c8d49633664143c3c8f36683b12"},{url:"/windows11/Square44x44Logo.targetsize-36.png",revision:"6b27bf0be89dada5e5fe91bef9a26d99"},{url:"/windows11/Square44x44Logo.targetsize-40.png",revision:"96382e9a1849fa02a998806c2a9eaa33"},{url:"/windows11/Square44x44Logo.targetsize-44.png",revision:"dde8fee1c8eeff37655f4828801af60d"},{url:"/windows11/Square44x44Logo.targetsize-48.png",revision:"95ae4d69acd55eed5572f24ed72c8004"},{url:"/windows11/Square44x44Logo.targetsize-60.png",revision:"0aa9ac5148f3899312612765b719abe6"},{url:"/windows11/Square44x44Logo.targetsize-64.png",revision:"a871bafb48d60c993b27f9426a87c126"},{url:"/windows11/Square44x44Logo.targetsize-72.png",revision:"30961eff965b2e4140e5fb7ceaf4841b"},{url:"/windows11/Square44x44Logo.targetsize-80.png",revision:"854bc8e7cecac0116d24a1a2cd00411b"},{url:"/windows11/Square44x44Logo.targetsize-96.png",revision:"8c5d1eca12055967f0e21886efde4d0c"},{url:"/windows11/StoreLogo.scale-100.png",revision:"beb1a5bd8693e52ef4ca395d91745cab"},{url:"/windows11/StoreLogo.scale-125.png",revision:"21d549c963b2befe8d27579c50cab748"},{url:"/windows11/StoreLogo.scale-150.png",revision:"8a897ebf4340eb70117ee427ba8f809a"},{url:"/windows11/StoreLogo.scale-200.png",revision:"4fd259670dfe4955c4414570a3f41393"},{url:"/windows11/StoreLogo.scale-400.png",revision:"dcf8bdcc796d81be39187049814ef95c"},{url:"/windows11/Wide310x150Logo.scale-100.png",revision:"b4ee7264468f320e24ebacea12915b1a"},{url:"/windows11/Wide310x150Logo.scale-125.png",revision:"47e03f54a3c89e8a0156a87934727b41"},{url:"/windows11/Wide310x150Logo.scale-150.png",revision:"2f46228a2adb3314502c7dddf36e8aef"},{url:"/windows11/Wide310x150Logo.scale-200.png",revision:"860280df3cafe409338e3cc42e9e6545"},{url:"/windows11/Wide310x150Logo.scale-400.png",revision:"ef72cf1d1b4ca5a82c69c8af2133aef1"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:function(e){return _ref.apply(this,arguments)}}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var i=e.sameOrigin,a=e.url.pathname;return!(!i||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var i=e.request,a=e.url.pathname,n=e.sameOrigin;return"1"===i.headers.get("RSC")&&"1"===i.headers.get("Next-Router-Prefetch")&&n&&!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var i=e.request,a=e.url.pathname,n=e.sameOrigin;return"1"===i.headers.get("RSC")&&n&&!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var i=e.url.pathname;return e.sameOrigin&&!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){return!e.sameOrigin}),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
