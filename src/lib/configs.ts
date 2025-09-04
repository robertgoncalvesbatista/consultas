import { BookOpen, Bot, LifeBuoy, Send, Settings2, User } from "lucide-react";

export const sidebarMenu = {
  navMain: [
    {
      title: "Cadastro Pessoa Física",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "Basic",
          url: "/cadastro-pessoa-fisica/basic",
        },
        {
          title: "Plus",
          url: "/cadastro-pessoa-fisica/plus",
        },
      ],
    },
    {
      title: "Models",
      url: "/bla-bla-bla",
      icon: Bot,
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};
