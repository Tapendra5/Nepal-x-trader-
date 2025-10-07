// app.js const firebaseConfig = { apiKey: "AIzaSyBX3-J3vZlGnM_CkKnXn7jVVdZj7Rrsx-8", authDomain: "nepal-trader.firebaseapp.com", projectId: "nepal-trader", storageBucket: "nepal-trader.firebasestorage.app", messagingSenderId: "225982610863", appId: "1:225982610863:web:dfe44ff14d72f91013435a", measurementId: "G-R6K7E8814T" };

firebase.initializeApp(firebaseConfig); const auth = firebase.auth(); const db = firebase.firestore();

// Elements const loginForm = document.getElementById('login-form'); const registerForm = document.getElementById('register-form'); const showRegister = document.getElementById('show-register'); const showLogin = document.getElementById('show-login'); const msg = document.getElementById('auth-msg'); const appSection = document.getElementById('app-section'); const authSection = document.getElementById('auth-section'); const userNameEl = document.getElementById('user-name'); const balanceEl = document.getElementById('user-balance'); const packagesDiv = document.getElementById('packages'); const withdrawCard = document.getElementById('withdraw-card'); const historyCard = document.getElementById('history-card');

// Package List const packageList = [ {name:'Starter', amount:500}, {name:'Pro', amount:1000}, {name:'Premium', amount:5000} ];

// Show/Hide Forms showRegister.addEventListener('click', e=>{ e.preventDefault(); loginForm.classList.add('hidden'); registerForm.classList.remove('hidden'); }); showLogin.addEventListener('click', e=>{ e.preventDefault(); registerForm.classList.add('hidden'); loginForm.classList.remove('hidden'); });

// Register document.getElementById('btn-register').addEventListener('click', async()=>{ const name=document.getElementById('reg-name').value; const email=document.getElementById('reg-email').value; const pass=document.getElementById('reg-pass').value; try{ const cred=await auth.createUserWithEmailAndPassword(email,pass); await db.collection('users').doc(cred.user.uid).set({ displayName:name||email.split('@')[0], email, balance:0, createdAt:firebase.firestore.FieldValue.serverTimestamp() }); }catch(e){ alert(e.message); } });

// Login document.getElementById('btn-login').addEventListener('click', async()=>{ const email=document.getElementById('login-email').value; const pass=document.getElementById('login-pass').value; msg.innerText=''; try{ await auth.signInWithEmailAndPassword(email,pass); }catch(e){ msg.innerText=e.message; } });

// Auth State Change auth.onAuthStateChanged(user=>{ if(user){ authSection.classList.add('hidden'); appSection.classList.remove('hidden'); db.collection('users').doc(user.uid).onSnapshot(doc=>{ const data=doc.data(); userNameEl.innerText=data.displayName||user.email; balanceEl.innerText=Number(data.balance||0); }); renderPackages(); }else{ authSection.classList.remove('hidden'); appSection.classList.add('hidden'); } });

// Render Packages function renderPackages(){ packagesDiv.innerHTML=''; packageList.forEach(p=>{ const div=document.createElement('div'); div.className='package-card'; div.innerHTML=<b>${p.name}</b> - Rs.${p.amount} <br><button onclick="buyPackage('${p.name}',${p.amount})">Buy</button>; packagesDiv.appendChild(div); }); }

// Buy Package via WhatsApp function buyPackage(name,amount){ const phone='9766692182'; const msgTxt=encodeURIComponent(Hello, I want to buy ${name} package for Rs.${amount}); window.open(https://wa.me/${phone}?text=${msgTxt},'_blank'); }

// Logout document.getElementById('btn-logout').addEventListener('click',()=>auth.signOut());

