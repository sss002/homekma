import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, ArrowDown, Loader2, Copy, ChevronLeft, ChevronRight } from 'lucide-react'

const MODELS = [
  { id: 'gpt4', name: 'GPT-4', color: 'from-green-400 to-emerald-400' , desc: '강력한 범용 LLM' },
  { id: 'claude', name: 'Claude', color: 'from-orange-400 to-amber-400' , desc: '안전성에 중점' },
  { id: 'gemini', name: 'Gemini', color: 'from-sky-500 to-indigo-500' , desc: '구글의 멀티모달 모델' },
  { id: 'dalle', name: 'DALL·E 3', color: 'from-violet-500 to-pink-500' , desc: '이미지 합성 전문' }
]

export default function App(){
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [modelIndex, setModelIndex] = useState(0)
  const [tab, setTab] = useState('text')
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(null)
  const [copied, setCopied] = useState(false)
  const heroHeadline = useRef(null)

  useEffect(()=>{document.body.classList.remove('light','dark');document.body.classList.add(theme);localStorage.setItem('theme', theme)},[theme])

  useEffect(()=>{
    // simple scroll progress
    const onScroll = ()=>{
      const h = document.documentElement.scrollHeight - window.innerHeight
      const pct = (window.scrollY / Math.max(1,h)) * 100
      const bar = document.getElementById('progress')
      if(bar) bar.style.width = pct + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return ()=>window.removeEventListener('scroll', onScroll)
  },[])

  useEffect(()=>{ // headline per-letter animate
    if(!heroHeadline.current) return
    const el = heroHeadline.current
    const text = el.textContent || ''
    el.innerHTML = text.split('').map((c,i)=>`<span style="opacity:0;display:inline-block;transform:translateY(8px)" data-i="${i}">${c}</span>`).join('')
    const spans = el.querySelectorAll('span')
    spans.forEach((s,i)=>setTimeout(()=>{s.style.transition='all .45s ease';s.style.opacity='1';s.style.transform='translateY(0)'}, i*40))
  },[])

  function handleGenerate(){
    setLoading(true);setResult('');setCopied(false)
    // simulate typing
    const sample = tab==='text'? `예시 텍스트: "${prompt || '간단한 소개 글'}"` : tab==='image'? `이미지 아이디어: ${prompt || '우주와 기하학의 조화'}` : `코드 예시:\nconsole.log('Hello GenAI')`
    let i=0
    const id = setInterval(()=>{
      i++
      setResult(sample.slice(0,i))
      if(i>=sample.length){clearInterval(id);setLoading(false)}
    }, 18)
  }

  function copyResult(){
    navigator.clipboard?.writeText(result).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),1400)})
  }

  // simple tilt handler
  function attachTilt(e){
    const el = e.currentTarget
    el.onmousemove = ev => {
      const r = el.getBoundingClientRect()
      const x = (ev.clientX - r.left) / r.width
      const y = (ev.clientY - r.top) / r.height
      el.style.transform = `perspective(900px) rotateX(${(0.5-y)*8}deg) rotateY(${(x-0.5)*12}deg) translateZ(6px)`
    }
    el.onmouseleave = ()=>{el.style.transform='none'}
  }

  return (
    <div className="min-h-screen text-slate-900 relative overflow-x-hidden">
      <div id="progress" className="scroll-progress" style={{width:0}} />

      <header className="fixed top-4 left-0 right-0 px-6 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold bg-clip-text text-transparent" style={{background:'linear-gradient(90deg,#7c3aed,#0ea5e9,#ff49a1)'}}>GenAI Learn</div>
          <div className="flex items-center gap-4">
            <motion.button whileTap={{rotate:45}} title="Toggle theme" onClick={()=>setTheme(t=>t==='dark'?'light':'dark')} className="p-2 rounded-full glass-btn glass">
              {theme==='dark'? <Sun size={18}/> : <Moon size={18}/>}
            </motion.button>
          </div>
        </div>
      </header>

      <main className="pt-28">
        {/* HERO */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 -z-10" style={{background: theme==='dark' ? 'linear-gradient(120deg,#020617,#071028)' : 'linear-gradient(120deg,#ffffff,#eef2ff)'}} />

          <div className="max-w-6xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 ref={heroHeadline} className="text-5xl md:text-6xl font-extrabold leading-tight">생성형 AI의 세계로</h1>
                <p className="mt-4 text-lg text-slate-500 dark:text-slate-300"> <span id="subtyping" className="font-medium">텍스트, 이미지, 코드를 생성하는 미래 기술</span></p>
                <div className="mt-6 flex items-center gap-4">
                  <button onClick={()=>document.getElementById('practice')?.scrollIntoView({behavior:'smooth'})} className="px-6 py-3 rounded-xl glass cta shadow-lg hover:shadow-2xl transition">시작하기</button>
                  <button className="px-4 py-2 rounded-lg glass">자세히 보기</button>
                </div>
              </div>

              <div className="relative h-80 md:h-96">
                <div className="absolute w-40 h-40 rounded-2xl glass -right-8 -top-6 transform rotate-12" />
                <div className="absolute w-64 h-64 rounded-3xl glass -left-10 top-16 transform rotate-6" />
                <div className="absolute w-44 h-44 rounded-full" style={{right:40, bottom:-10, background:'linear-gradient(90deg,#7c3aed,#0ea5e9)'}}/>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 w-full flex justify-center">
            <button className="animate-bounce glass p-3 rounded-full"><ArrowDown/></button>
          </div>
        </section>

        {/* CONCEPT */}
        <section className="max-w-6xl mx-auto px-6 mt-24">
          <h2 className="text-3xl font-semibold">생성형 AI란?</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {['학습','생성','진화'].map((t,i)=> (
              <motion.div key={t} onMouseEnter={attachTilt} className="tilt-card glass p-6 rounded-2xl" initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} transition={{delay:i*0.12}}>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 mb-4" />
                <h3 className="font-semibold text-xl">{t}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{t==='학습'?'AI가 데이터에서 패턴 학습':'생성'==='생성'?'새로운 콘텐츠 창조':'지속적 개선'}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* MODELS */}
        <section className="max-w-6xl mx-auto px-6 mt-20">
          <h2 className="text-3xl font-semibold">주요 AI 모델</h2>
          <div className="mt-6 relative">
            <div className="flex items-center gap-4">
              <button onClick={()=>setModelIndex(i=>Math.max(0,i-1))} className="p-3 rounded-lg glass"><ChevronLeft/></button>
              <div className="flex-1 overflow-hidden">
                <div className="flex gap-6" style={{transform:`translateX(-${modelIndex*100}%)`,transition:'transform .45s ease'}}>
                  {MODELS.map(m=> (
                    <div key={m.id} className={`min-w-full p-6 rounded-2xl tilt-card glass`} onMouseEnter={attachTilt}>
                      <div className={`h-40 rounded-lg bg-gradient-to-r ${m.color} shadow-lg`} />
                      <h3 className="mt-4 text-xl font-semibold">{m.name}</h3>
                      <p className="text-slate-500 dark:text-slate-300 mt-2">{m.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={()=>setModelIndex(i=>Math.min(MODELS.length-1,i+1))} className="p-3 rounded-lg glass"><ChevronRight/></button>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {MODELS.map((m,i)=> <button key={m.id} onClick={()=>setModelIndex(i)} className={`w-3 h-3 rounded-full ${i===modelIndex? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-slate-300/40'}`}/>) }
            </div>
          </div>
        </section>

        {/* BENTO */}
        <section className="max-w-6xl mx-auto px-6 mt-20">
          <h2 className="text-3xl font-semibold">어디에 활용하나요?</h2>
          <div className="mt-6 grid grid-cols-6 gap-4">
            <div className="col-span-6 md:col-span-3 lg:col-span-3 p-6 glass rounded-2xl" onClick={()=>setShowModal('content')}>콘텐츠 제작</div>
            <div className="col-span-6 md:col-span-3 lg:col-span-2 p-6 glass rounded-2xl" onClick={()=>setShowModal('image')}>이미지 생성</div>
            <div className="col-span-6 md:col-span-3 lg:col-span-1 p-6 glass rounded-2xl" onClick={()=>setShowModal('code')}>코드 개발</div>
            <div className="col-span-6 md:col-span-2 lg:col-span-2 p-6 glass rounded-2xl" onClick={()=>setShowModal('data')}>데이터 분석</div>
            <div className="col-span-6 md:col-span-2 lg:col-span-2 p-6 glass rounded-2xl" onClick={()=>setShowModal('cs')}>고객 서비스</div>
            <div className="col-span-6 md:col-span-2 lg:col-span-2 p-6 glass rounded-2xl" onClick={()=>setShowModal('edu')}>교육</div>
          </div>
        </section>

        {/* PRACTICE */}
        <section id="practice" className="max-w-6xl mx-auto px-6 mt-20">
          <h2 className="text-3xl font-semibold">직접 체험해보기</h2>
          <div className="mt-6 bg-transparent p-6 rounded-2xl glass">
            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-slate-800/10 rounded-md p-1">
                <button className={`px-3 py-2 rounded-md ${tab==='text'?'bg-white/10':''}`} onClick={()=>setTab('text')}>텍스트 생성</button>
                <button className={`px-3 py-2 rounded-md ${tab==='image'?'bg-white/10':''}`} onClick={()=>setTab('image')}>이미지 아이디어</button>
                <button className={`px-3 py-2 rounded-md ${tab==='code'?'bg-white/10':''}`} onClick={()=>setTab('code')}>코드 작성</button>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="text-sm text-slate-400">모델:</div>
                <select value={MODELS[modelIndex].id} onChange={e=>setModelIndex(MODELS.findIndex(m=>m.id===e.target.value))} className="rounded-md p-2 glass">
                  {MODELS.map(m=> <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <input placeholder="무엇을 만들고 싶나요?" value={prompt} onChange={e=>setPrompt(e.target.value)} className="col-span-1 md:col-span-2 p-4 rounded-xl glass focus:outline-none" />
              <div className="flex items-center gap-2">
                <button onClick={handleGenerate} className="px-4 py-3 rounded-xl cta w-full">생성하기</button>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl glass relative">
              {loading? (
                <div className="flex items-center gap-3"><Loader2 className="animate-spin"/> <span>생성 중...</span></div>
              ) : (
                <div>
                  <pre className="whitespace-pre-wrap">{result}</pre>
                </div>
              )}
              <div className="absolute top-4 right-4">
                <button onClick={copyResult} className="p-2 rounded-md glass">{copied? '✓' : <Copy/>}</button>
              </div>
            </div>
          </div>
        </section>

        <footer className="max-w-6xl mx-auto px-6 mt-20 mb-10 flex justify-between items-center text-sm">
          <div>GenAI Learn © 2025</div>
          <div className="flex gap-4">
            <a className="hover:opacity-80">Twitter</a>
            <a className="hover:opacity-80">GitHub</a>
          </div>
        </footer>
      </main>

      <AnimatePresence>{showModal && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="modal-bg" onClick={()=>setShowModal(null)}>
          <motion.div initial={{y:20,scale:0.98}} animate={{y:0,scale:1}} exit={{y:10,scale:0.98}} onClick={e=>e.stopPropagation()} className="bg-white dark:bg-slate-900 p-6 rounded-2xl max-w-xl w-full">
            <h3 className="text-xl font-semibold">상세 정보</h3>
            <p className="mt-3">{showModal}에 대한 상세 설명 (예시)</p>
            <div className="mt-4 text-right"><button onClick={()=>setShowModal(null)} className="px-4 py-2 rounded-md glass">닫기</button></div>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>
    </div>
  )
}
