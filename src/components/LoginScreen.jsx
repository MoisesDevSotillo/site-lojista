import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Store } from 'lucide-react'

const LoginScreen = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({
    storeName: '',
    ownerName: '',
    email: '',
    phone: '',
    cnpj: '',
    address: '',
    category: 'eletrônicos',
    password: '',
    confirmPassword: ''
  })

  const handleLogin = (e) => {
    e.preventDefault()
    // Simulação de login - em produção seria uma chamada à API
    if (loginData.email && loginData.password) {
      onLogin({
        storeName: 'TechStore',
        ownerName: 'João Silva',
        email: loginData.email,
        category: 'Eletrônicos',
        address: 'Shopping Center, Loja 123',
        phone: '(48) 3333-4444'
      })
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    // Simulação de registro - em produção seria uma chamada à API
    if (registerData.storeName && registerData.email && registerData.password === registerData.confirmPassword) {
      onLogin({
        storeName: registerData.storeName,
        ownerName: registerData.ownerName,
        email: registerData.email,
        category: registerData.category,
        address: registerData.address,
        phone: registerData.phone
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#66CCFF] to-[#4DB8FF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-white p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Store className="h-10 w-10 text-[#66CCFF]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Wendy Lojista</h1>
          <p className="text-blue-100">Gerencie sua loja online</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Bem-vindo</CardTitle>
            <CardDescription className="text-center">
              Entre na sua conta ou cadastre sua loja
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Cadastrar Loja</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Sua senha"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#66CCFF] hover:bg-[#4DB8FF] text-white">
                    Entrar
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Nome da loja</Label>
                    <Input
                      id="store-name"
                      type="text"
                      placeholder="Nome da sua loja"
                      value={registerData.storeName}
                      onChange={(e) => setRegisterData({ ...registerData, storeName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner-name">Nome do proprietário</Label>
                    <Input
                      id="owner-name"
                      type="text"
                      placeholder="Seu nome"
                      value={registerData.ownerName}
                      onChange={(e) => setRegisterData({ ...registerData, ownerName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">E-mail</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(48) 3333-4444"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      type="text"
                      placeholder="00.000.000/0001-00"
                      value={registerData.cnpj}
                      onChange={(e) => setRegisterData({ ...registerData, cnpj: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      type="text"
                      placeholder="Endereço da loja"
                      value={registerData.address}
                      onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Senha</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Sua senha"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar senha</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirme sua senha"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#66CCFF] hover:bg-[#4DB8FF] text-white">
                    Cadastrar Loja
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginScreen

