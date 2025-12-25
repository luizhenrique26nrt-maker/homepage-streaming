"use client";

import { useState } from "react";
import { CreditCard, Shield, CheckCircle, ArrowRight, Lock, Zap, Globe, TrendingUp, Users, DollarSign, BarChart3, Wallet } from "lucide-react";

// Tipos
interface Plan {
  id: number;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

const plans: Plan[] = [
  {
    id: 1,
    name: "Starter",
    price: "R$ 29",
    period: "/mês",
    features: [
      "Até 100 transações/mês",
      "Taxa de 3,5% por transação",
      "Suporte por email",
      "Dashboard básico",
      "API de integração"
    ]
  },
  {
    id: 2,
    name: "Professional",
    price: "R$ 99",
    period: "/mês",
    features: [
      "Até 1.000 transações/mês",
      "Taxa de 2,5% por transação",
      "Suporte prioritário 24/7",
      "Dashboard avançado",
      "API completa",
      "Webhooks personalizados",
      "Relatórios detalhados"
    ],
    popular: true
  },
  {
    id: 3,
    name: "Enterprise",
    price: "R$ 299",
    period: "/mês",
    features: [
      "Transações ilimitadas",
      "Taxa de 1,9% por transação",
      "Gerente de conta dedicado",
      "Dashboard premium",
      "API completa + SDK",
      "Webhooks avançados",
      "Análises em tempo real",
      "Integração personalizada",
      "SLA garantido"
    ]
  }
];

const paymentMethods: PaymentMethod[] = [
  { id: "credit", name: "Cartão de Crédito", icon: "💳" },
  { id: "debit", name: "Cartão de Débito", icon: "💳" },
  { id: "pix", name: "PIX", icon: "⚡" },
  { id: "boleto", name: "Boleto", icon: "📄" }
];

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cpf: ""
  });

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowCheckout(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Pagamento processado com sucesso! Plano ${selectedPlan?.name} ativado.`);
    setShowCheckout(false);
    setSelectedPlan(null);
    setFormData({
      name: "",
      email: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      cpf: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              PayFlow
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Recursos
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Preços
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
              Contato
            </a>
          </div>

          <button className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
            Entrar
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold mb-8">
            <Zap className="w-4 h-4" />
            Plataforma de Pagamentos Moderna
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Aceite Pagamentos
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              De Forma Simples
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Integre pagamentos em minutos. API moderna, taxas competitivas e suporte 24/7. 
            Aceite cartões, PIX, boleto e muito mais.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20">
              Ver Documentação
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="text-3xl sm:text-4xl font-black text-white mb-2">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="text-3xl sm:text-4xl font-black text-white mb-2">50k+</div>
              <div className="text-gray-400 text-sm">Empresas</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="text-3xl sm:text-4xl font-black text-white mb-2">R$ 2B</div>
              <div className="text-gray-400 text-sm">Processado</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="text-3xl sm:text-4xl font-black text-white mb-2">24/7</div>
              <div className="text-gray-400 text-sm">Suporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Por que escolher o PayFlow?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Tecnologia de ponta para processar pagamentos com segurança e eficiência
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Segurança Máxima</h3>
              <p className="text-gray-400 leading-relaxed">
                Certificação PCI-DSS Level 1 e criptografia de ponta a ponta para proteger todas as transações.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Integração Rápida</h3>
              <p className="text-gray-400 leading-relaxed">
                API RESTful moderna e SDKs para todas as linguagens. Comece a aceitar pagamentos em minutos.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Global</h3>
              <p className="text-gray-400 leading-relaxed">
                Aceite pagamentos de mais de 135 países com suporte a múltiplas moedas.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Analytics Avançado</h3>
              <p className="text-gray-400 leading-relaxed">
                Dashboard completo com métricas em tempo real e relatórios detalhados de vendas.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Suporte Dedicado</h3>
              <p className="text-gray-400 leading-relaxed">
                Equipe especializada disponível 24/7 para ajudar você e seus clientes.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Taxas Competitivas</h3>
              <p className="text-gray-400 leading-relaxed">
                As menores taxas do mercado sem custos ocultos. Você paga apenas pelo que usar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Planos para todos os tamanhos
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Escolha o plano ideal para o seu negócio. Sem taxas de setup ou mensalidades escondidas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white/5 backdrop-blur-sm border rounded-3xl p-8 hover:bg-white/10 transition-all ${
                  plan.popular
                    ? "border-purple-500 shadow-2xl shadow-purple-500/20 scale-105"
                    : "border-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full">
                    Mais Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-4">
                    <span className="text-5xl font-black text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-xl hover:shadow-purple-500/50"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  Começar Agora
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {showCheckout && selectedPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setShowCheckout(false)}
        >
          <div
            className="bg-slate-900 border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">Finalizar Pagamento</h2>
                  <p className="text-gray-400">
                    Plano {selectedPlan.name} - {selectedPlan.price}{selectedPlan.period}
                  </p>
                </div>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Methods */}
                <div>
                  <label className="block text-white font-semibold mb-4">
                    Método de Pagamento
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedPaymentMethod(method.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedPaymentMethod === method.id
                            ? "border-purple-500 bg-purple-500/10"
                            : "border-white/10 bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <div className="text-3xl mb-2">{method.icon}</div>
                        <div className="text-white text-sm font-semibold">{method.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Nome Completo</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="João Silva"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="joao@exemplo.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">CPF</label>
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="000.000.000-00"
                    />
                  </div>

                  {selectedPaymentMethod === "credit" || selectedPaymentMethod === "debit" ? (
                    <>
                      <div>
                        <label className="block text-white font-semibold mb-2">
                          Número do Cartão
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white font-semibold mb-2">Validade</label>
                          <input
                            type="text"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="MM/AA"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-semibold mb-2">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>

                {/* Security Badge */}
                <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <Lock className="w-5 h-5 text-green-400" />
                  <p className="text-sm text-green-400">
                    Pagamento 100% seguro e criptografado
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!selectedPaymentMethod}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmar Pagamento
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 border-t border-white/10">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-white">PayFlow</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 PayFlow. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
