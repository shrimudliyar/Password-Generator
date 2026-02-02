import { useCallback, useState , useEffect , useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
    const [length,setLength] = useState(8)
    const [numberAllowed,setNumberAllowed] = useState(false)
    const [charcterAllowed,setCharacterAllowed] = useState(false);
    const [password,setPassword] = useState("")
    const passwordRef = useRef(null)

    const passwordGenerator = useCallback(()=>{

      let pass=""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if(numberAllowed) str+="1234567890"
      if(charcterAllowed) str+="~!@#$%^&*(){}[]"

      for (let i = 1; i<=length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }

      setPassword(pass)

    },[length,numberAllowed,charcterAllowed,setPassword])

    const copyToClipboard = useCallback(()=>{
      passwordRef.current?.select()
      // passwordRef.current?.setSelectionRange(0,3)
      window.navigator.clipboard.writeText(password)
    },[password])

    useEffect(()=>{
      passwordGenerator()
    },[length,numberAllowed,charcterAllowed,passwordGenerator])

  return (
    <>
        <div className='w-5xl max-w-auto mx-auto shadow-md rounded-lg px-4 my-8 text-gray-400 bg-gray-800'>
          <h1 className='text-white text-center p-3 text-2xl'>Password Generator</h1>
          <div  className='className="flex shadow rounded-lg overflow-hidden mb-4 p-4"'>
            <input 
            type="text" 
            value={password}
            className='outline-none w-4xl py-1 px-3 bg-amber-50 my-4 rounded-2xl text-gray-700 '
            placeholder='Password' 
            readOnly
            ref={passwordRef}
            />
            <button 
            onClick ={copyToClipboard}
            className='outline-none bg-blue-700 hover:bg-blue-800 shrink-0 text-white text-xl rounded-xl px-2 pb-1 m-2 cursor-pointer'>copy</button>
          </div>

              <div className='text-sm flex gap-x-2 text-white'>
                <div className='flex items-centre gap-x-1'>
                  <input 
                  type="range"
                  min={8}
                  max={16}
                  className='cursor-pointer'
                  onChange={(e) => {setLength(e.target.value)}}
                  />
                    <label>Length:{length}</label>
                </div>
                <div className='flex items-center gap-x-1'>
                  <input 
                          className='accent-blue-500 cursor-pointer'
                          type="checkbox"
                          defaultChecked={numberAllowed}
                          id='numberInput'
                          onChange={()=>{setNumberAllowed((prev)=>!prev)}}
                  />
                  <label htmlFor='numberInput'>Numbers</label>
                </div>
                <div className='flex items-center gap-x-1 '>
                  <input 
                          className='accent-blue-500 cursor-pointer'
                          type="checkbox"
                          defaultChecked={charcterAllowed}
                          id='characterInput'
                          onChange={()=>{setCharacterAllowed((prev)=>!prev)}}
                  />
                  <label htmlFor='characterInput'>Characters</label>
                </div>
              </div>

        </div>
    </>
  )
}

export default App
