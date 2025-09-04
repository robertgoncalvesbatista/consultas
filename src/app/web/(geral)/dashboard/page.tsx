import {
  ArrowRight,
  Building2,
  CheckCircle,
  Clock,
  CreditCard,
  Database,
  FileText,
  Globe,
  Shield,
  ShieldAlert,
  TrendingUp,
  User,
  Users,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const services = [
    {
      title: "Cadastro Pessoa Física - Basic",
      description:
        "Consulte dados básicos de CPF com informações pessoais, endereços e contatos de forma rápida e segura.",
      details: "Inclui: Nome, CPF, idade, telefones, emails e endereços",
      icon: <User className="h-6 w-6 text-blue-600" />,
      href: "/consulta-pf-basic",
      badge: "Mais Popular",
      badgeVariant: "success",
      stats: "2.3M+ consultas",
    },
    {
      title: "Cadastro Pessoa Física - Plus",
      description:
        "Versão completa com dados familiares, profissionais e informações detalhadas sobre parentescos.",
      details:
        "Inclui: Todos os dados básicos + parentescos, CBO, renda estimada",
      icon: <User className="h-6 w-6 text-purple-600" />,
      href: "/consulta-pf-plus",
      badge: "Completo",
      badgeVariant: "secondary",
      stats: "1.8M+ consultas",
    },
    {
      title: "Cadastro Pessoa Jurídica",
      description:
        "Consulte dados completos de empresas: CNPJ, situação cadastral, sócios e atividades econômicas.",
      details:
        "Inclui: CNPJ, razão social, endereço, situação, quadro societário",
      icon: <Building2 className="h-6 w-6 text-green-600" />,
      href: "/consulta-pj",
      badge: "Empresas",
      badgeVariant: "default",
      stats: "890K+ consultas",
    },
    {
      title: "Antecedentes Criminais",
      description:
        "Verifique histórico criminal e judicial com dados oficiais dos tribunais brasileiros.",
      details: "Inclui: Processos criminais, condenações, mandados de prisão",
      icon: <ShieldAlert className="h-6 w-6 text-red-600" />,
      href: "/antecedentes",
      badge: "Judicial",
      badgeVariant: "destructive",
      stats: "1.2M+ consultas",
    },
    {
      title: "Acordos de Leniência",
      description:
        "Pesquise registros e acordos relacionados à corrupção e crimes contra a administração pública.",
      details: "Inclui: Acordos CGU, MPF, TCU e órgãos de controle",
      icon: <FileText className="h-6 w-6 text-orange-600" />,
      href: "/acordos-leniencia",
      badge: "Compliance",
      badgeVariant: "default",
      stats: "156K+ consultas",
    },
    {
      title: "Contas Bancárias",
      description:
        "Acesse informações sobre contas bancárias vinculadas a CPF com dados do sistema financeiro.",
      details: "Inclui: Bancos, agências, tipos de conta, movimentações",
      icon: <CreditCard className="h-6 w-6 text-indigo-600" />,
      href: "/contas-bancarias",
      badge: "Financeiro",
      badgeVariant: "secondary",
      stats: "650K+ consultas",
    },
  ];

  const stats = [
    { label: "Consultas Realizadas", value: "7.2M+", icon: Database },
    { label: "Usuários Ativos", value: "45K+", icon: Users },
    { label: "Uptime", value: "99.9%", icon: TrendingUp },
    { label: "Países Atendidos", value: "12", icon: Globe },
  ];

  const features = [
    {
      icon: <Zap className="h-5 w-5 text-yellow-600" />,
      title: "Consultas Instantâneas",
      description: "Resultados em menos de 3 segundos",
    },
    {
      icon: <Shield className="h-5 w-5 text-green-600" />,
      title: "100% Seguro",
      description: "Dados protegidos com criptografia de ponta",
    },
    {
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      title: "24/7 Disponível",
      description: "Acesso ininterrupto aos nossos serviços",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-purple-600" />,
      title: "Dados Oficiais",
      description: "Informações direto das fontes governamentais",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="flex flex-1 flex-col gap-8 p-6 pt-4">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
              Consulta de Dados Públicos
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Acesse informações confiáveis de pessoas físicas, jurídicas e
              registros oficiais com a maior plataforma de consultas do Brasil.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                      <IconComponent className="h-6 w-6 text-neutral-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-neutral-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services Section */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
              Nossos Serviços
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Escolha o tipo de consulta que você precisa. Todos os dados são
              atualizados em tempo real e provenientes de fontes oficiais.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {services.map((service, i) => (
              <Card
                key={i}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <Badge variant={service.badgeVariant}>
                      {service.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-neutral-50 rounded-lg">
                      <p className="text-xs text-neutral-700 font-medium">
                        {service.details}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span>{service.stats}</span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Online
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    asChild
                    className="w-full group-hover:bg-neutral-800 transition-colors"
                  >
                    <a href={service.href}>
                      Consultar Agora
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <h3 className="text-2xl font-bold text-neutral-900">
              Por que escolher nossa plataforma?
            </h3>
            <p className="text-neutral-600">
              Tecnologia de ponta combinada com dados oficiais para oferecer a
              melhor experiência
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center space-y-3 p-4 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <div className="flex justify-center">
                  <div className="p-3 bg-neutral-100 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="font-semibold text-neutral-900">
                  {feature.title}
                </h4>
                <p className="text-sm text-neutral-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-2xl shadow-xl p-8 text-center text-white max-w-4xl mx-auto">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Pronto para começar?</h3>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Junte-se a milhares de usuários que confiam em nossa plataforma
              para consultas rápidas, seguras e confiáveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                variant="outline"
                className="bg-white text-neutral-900 hover:bg-neutral-100 border-white"
              >
                Ver Documentação
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Falar com Suporte
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
