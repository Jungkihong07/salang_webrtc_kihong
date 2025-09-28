import React, { useState, useEffect } from 'react'
import { joinRoom } from 'trystero'
import './App.css'

// Supabase 설정
const SUPABASE_URL = 'http://127.0.0.1:54321'
const SUPABASE_ANON_KEY = 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH'

// coturn 설정
const TURN_CONFIG = {
  iceServers: [
    {
      urls: 'stun:localhost:3478'
    },
    {
      urls: 'turn:localhost:3478',
      username: 'salang',
      credential: 'salang123'
    }
  ]
}

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [roomId, setRoomId] = useState('')
  const [status, setStatus] = useState('연결 대기 중...')
  const [localVideo, setLocalVideo] = useState<HTMLVideoElement | null>(null)
  const [remoteVideo, setRemoteVideo] = useState<HTMLVideoElement | null>(null)

  useEffect(() => {
    // 로컬 비디오 스트림 초기화
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        const video = document.createElement('video')
        video.srcObject = stream
        video.autoplay = true
        video.muted = true
        setLocalVideo(video)
      })
      .catch(err => {
        console.error('비디오 스트림 가져오기 실패:', err)
        setStatus('비디오 스트림을 가져올 수 없습니다.')
      })
  }, [])

  const connectToRoom = async () => {
    if (!roomId.trim()) {
      setStatus('방 ID를 입력해주세요.')
      return
    }

    try {
      setStatus('방에 연결 중...')
      
      // Trystero를 사용하여 방에 참여
      const room = joinRoom(
        { appId: 'salang-webrtc' },
        roomId,
        {
          provider: 'supabase',
          config: {
            url: SUPABASE_URL,
            anonKey: SUPABASE_ANON_KEY
          }
        }
      )

      // ICE 서버 설정
      room.setIceServers(TURN_CONFIG.iceServers)

      // 비디오 스트림 공유
      if (localVideo && localVideo.srcObject) {
        room.addStream(localVideo.srcObject as MediaStream, 'video')
      }

      // 원격 스트림 수신
      room.onPeerStream((stream, peerId) => {
        console.log('원격 스트림 수신:', peerId)
        const video = document.createElement('video')
        video.srcObject = stream
        video.autoplay = true
        setRemoteVideo(video)
        setStatus(`연결됨 - 상대방: ${peerId}`)
        setIsConnected(true)
      })

      // 피어 연결 이벤트
      room.onPeerJoin((peerId) => {
        console.log('피어 참여:', peerId)
        setStatus(`상대방이 참여했습니다: ${peerId}`)
      })

      // 피어 떠남 이벤트
      room.onPeerLeave((peerId) => {
        console.log('피어 떠남:', peerId)
        setStatus('상대방이 떠났습니다.')
        setIsConnected(false)
        setRemoteVideo(null)
      })

      setStatus('방에 성공적으로 연결되었습니다!')
      
    } catch (error) {
      console.error('방 연결 실패:', error)
      setStatus(`연결 실패: ${error}`)
    }
  }

  const disconnect = () => {
    setIsConnected(false)
    setRemoteVideo(null)
    setStatus('연결이 해제되었습니다.')
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Salang - 화상 통화 매칭</h1>
        <p>WebRTC + Trystero + Supabase + coturn 테스트</p>
      </header>

      <main className="App-main">
        <div className="connection-panel">
          <h2>연결 설정</h2>
          <div className="input-group">
            <label htmlFor="roomId">방 ID:</label>
            <input
              id="roomId"
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="방 ID를 입력하세요"
              disabled={isConnected}
            />
          </div>
          
          <div className="button-group">
            <button 
              onClick={connectToRoom} 
              disabled={isConnected}
            >
              방에 참여
            </button>
            <button 
              onClick={disconnect} 
              disabled={!isConnected}
            >
              연결 해제
            </button>
          </div>
          
          <div className="status">
            <strong>상태:</strong> {status}
          </div>
        </div>

        <div className="video-container">
          <div className="video-panel">
            <h3>내 비디오</h3>
            <div className="video-wrapper">
              {localVideo && (
                <video
                  ref={(el) => el && el.appendChild(localVideo)}
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
            </div>
          </div>

          <div className="video-panel">
            <h3>상대방 비디오</h3>
            <div className="video-wrapper">
              {remoteVideo ? (
                <video
                  ref={(el) => el && el.appendChild(remoteVideo)}
                  style={{ width: '100%', height: 'auto' }}
                />
              ) : (
                <div className="no-video">
                  상대방 비디오 대기 중...
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="App-footer">
        <div className="config-info">
          <h3>설정 정보</h3>
          <ul>
            <li><strong>Supabase URL:</strong> {SUPABASE_URL}</li>
            <li><strong>Supabase Key:</strong> {SUPABASE_ANON_KEY}</li>
            <li><strong>TURN Server:</strong> localhost:3478</li>
            <li><strong>Realtime Port:</strong> 4000</li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default App
