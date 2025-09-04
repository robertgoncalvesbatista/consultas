import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Database,
  FileSearch,
  Globe,
  Scale,
  Search,
  Shield,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">
              Consulta Rápida
            </h1>
          </div>

          <nav className="hidden md:flex space-x-8 text-muted-foreground font-medium">
            <a
              href="#servicos"
              className="hover:text-foreground transition-colors duration-200"
            >
              Serviços
            </a>
            <a
              href="#sobre"
              className="hover:text-foreground transition-colors duration-200"
            >
              Sobre
            </a>
            <a
              href="#contato"
              className="hover:text-foreground transition-colors duration-200"
            >
              Contato
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button
              asChild
              variant="ghost"
              className="hover:bg-muted transition-all duration-300"
            >
              <a href="/web/signin">Entrar</a>
            </Button>

            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <a href="/web/signup">
                <ArrowRight className="w-4 h-4 mr-2" />
                Registrar-se
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 py-20 px-6 text-center relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <Badge
            variant="secondary"
            className="mb-6 hover:bg-secondary/80 transition-colors"
          >
            <Zap className="w-3 h-3 mr-1" />
            Plataforma Inteligente de Consultas
          </Badge>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
            Consultas Inteligentes em{" "}
            <span className="text-primary">Segundos</span>
          </h2>

          <p className="text-lg md:text-xl max-w-3xl text-muted-foreground leading-relaxed mx-auto">
            Plataforma unificada para consultar dados de pessoa física,
            jurídica, acordos de leniência, antecedentes criminais e muito mais.
            Tudo em um só lugar.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 px-8 mt-8"
          >
            <a href="/web/signup">
              <Search className="w-5 h-5 mr-2" />
              Registrar-se Grátis
            </a>
          </Button>

          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground mt-4">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Gratuito para começar
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-primary mr-2" />
              100% Seguro
            </div>
            <div className="flex items-center">
              <Globe className="w-4 h-4 text-purple-500 mr-2" />
              Dados Atualizados
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Nossos Serviços
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Acesse múltiplas fontes de dados com tecnologia de ponta e
              interface intuitiva
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Pessoa Física",
                description:
                  "Consulta rápida de CPF, situação cadastral, histórico e vínculos com dados sempre atualizados.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Building2,
                title: "Pessoa Jurídica",
                description:
                  "Dados completos de CNPJ, participação societária, histórico de empresas e muito mais.",
                color: "from-indigo-500 to-purple-500",
              },
              {
                icon: FileSearch,
                title: "Acordos de Leniência",
                description:
                  "Informações sobre empresas e indivíduos envolvidos em processos de leniência.",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: ShieldCheck,
                title: "Antecedentes Criminais",
                description:
                  "Verificação de antecedentes em bases públicas e privadas com máxima precisão.",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Scale,
                title: "Compliance Corporativo",
                description:
                  "Ferramentas avançadas para due diligence e mitigação de riscos empresariais.",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: Database,
                title: "Outras Consultas",
                description:
                  "Explore diversas outras fontes de dados integradas com tecnologia de ponta.",
                color: "from-teal-500 to-cyan-500",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-500 hover:border-primary/50 bg-card hover:-translate-y-2"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                    >
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="mt-4 p-0 h-auto font-semibold text-primary hover:text-primary/80 group-hover:translate-x-1 transition-all"
                  >
                    Saiba mais
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            {[
              { number: "10M+", label: "Consultas realizadas" },
              { number: "50K+", label: "Clientes ativos" },
              { number: "99.9%", label: "Tempo de atividade" },
              { number: "< 2s", label: "Tempo de resposta" },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-3xl md:text-4xl font-bold mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-primary-foreground/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 px-6 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Comece sua jornada hoje mesmo
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Cadastre-se gratuitamente e tenha acesso a múltiplas fontes de dados
            em segundos. Sem compromisso, sem cartão de crédito.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 px-8"
            >
              <a href="/web/signup">
                <Star className="w-5 h-5 mr-2" />
                Criar Conta Gratuita
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="hover:bg-accent transition-all duration-300"
            >
              Falar com Especialista
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-card border-t py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-4 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Consulta Rápida
                </h3>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                A plataforma mais completa para consultas inteligentes do
                Brasil. Dados precisos, interface moderna e resultados
                instantâneos.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Serviços</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Pessoa Física
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Pessoa Jurídica
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Compliance
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Documentação
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Status
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} Consulta Rápida. Todos os direitos
              reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacidade
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Termos
              </a>
              <a
                href="mailto:suporte@consultarapida.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                suporte@consultarapida.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
