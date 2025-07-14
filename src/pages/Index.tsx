import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Icon from '@/components/ui/icon'

interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  isOnline: boolean
}

interface Message {
  id: string
  text: string
  sender: string
  time: string
  isOwn: boolean
}

export default function Index() {
  const [activeSection, setActiveSection] = useState<'chats' | 'archive' | 'search' | 'settings'>('chats')
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const chats: Chat[] = [
    {
      id: '1',
      name: 'Алексей Петров',
      avatar: 'AP',
      lastMessage: 'Привет! Как дела?',
      time: '12:30',
      unread: 2,
      isOnline: true
    },
    {
      id: '2',
      name: 'Команда разработки',
      avatar: 'КР',
      lastMessage: 'Обновили API документацию',
      time: '11:45',
      unread: 0,
      isOnline: false
    },
    {
      id: '3',
      name: 'Мария Иванова',
      avatar: 'МИ',
      lastMessage: 'Отправила файлы',
      time: '10:20',
      unread: 1,
      isOnline: true
    },
    {
      id: '4',
      name: 'Новости Tech',
      avatar: 'НТ',
      lastMessage: 'Новый релиз React 19',
      time: 'Вчера',
      unread: 0,
      isOnline: false
    }
  ]



  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Как дела?',
      sender: 'Алексей Петров',
      time: '12:30',
      isOwn: false
    },
    {
      id: '2',
      text: 'Привет! Все отлично, работаю над новым проектом',
      sender: 'Вы',
      time: '12:32',
      isOwn: true
    },
    {
      id: '3',
      text: 'Звучит интересно! Расскажешь подробнее?',
      sender: 'Алексей Петров',
      time: '12:33',
      isOwn: false
    }
  ])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'Вы',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      }
      setMessages(prev => [...prev, newMsg])
      setNewMessage('')
    }
  }

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-800">Telegram</h1>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Icon name="Plus" size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Icon name="MoreVertical" size={16} />
              </Button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Поиск"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-none h-9"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex border-b border-gray-200">
          {[
            { key: 'chats', label: 'Чаты', icon: 'MessageCircle' },
            { key: 'archive', label: 'Архив', icon: 'Archive' },
            { key: 'search', label: 'Поиск', icon: 'Search' },
            { key: 'settings', label: 'Настройки', icon: 'Settings' }
          ].map((item) => (
            <Button
              key={item.key}
              variant="ghost"
              size="sm"
              className={`flex-1 rounded-none h-10 ${
                activeSection === item.key ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveSection(item.key as any)}
            >
              <Icon name={item.icon as any} size={16} className="mr-1" />
              {item.label}
            </Button>
          ))}
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          {activeSection === 'chats' && (
            <div className="p-2">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    activeChat === chat.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setActiveChat(chat.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-600 text-white font-medium">
                          {chat.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {chat.isOnline && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900 truncate">
                          {chat.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {chat.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unread > 0 && (
                      <Badge className="bg-blue-600 text-white rounded-full px-2 py-1 text-xs">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeSection === 'archive' && (
            <div className="p-8 text-center text-gray-500">
              <Icon name="Archive" size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Архивированных чатов нет</p>
            </div>
          )}
          
          {activeSection === 'search' && (
            <div className="p-8 text-center text-gray-500">
              <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Введите запрос для поиска</p>
            </div>
          )}
          
          {activeSection === 'settings' && (
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <Icon name="User" size={20} />
                <span>Профиль</span>
              </div>
              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <Icon name="Bell" size={20} />
                <span>Уведомления</span>
              </div>
              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <Icon name="Shield" size={20} />
                <span>Конфиденциальность</span>
              </div>
              <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <Icon name="Palette" size={20} />
                <span>Темы</span>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-600 text-white">
                    {chats.find(c => c.id === activeChat)?.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="font-medium text-gray-900">
                    {chats.find(c => c.id === activeChat)?.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {chats.find(c => c.id === activeChat)?.isOnline ? 'В сети' : 'Был в сети недавно'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Icon name="Phone" size={18} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="Video" size={18} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="MoreVertical" size={18} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 bg-gray-50 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.isOwn
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <Icon name="Paperclip" size={20} />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Введите сообщение..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    <Icon name="Smile" size={18} />
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!newMessage.trim()}
                >
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <Icon name="MessageCircle" size={64} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                Добро пожаловать в Telegram
              </h3>
              <p className="text-gray-500">
                Выберите чат, чтобы начать общение
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}