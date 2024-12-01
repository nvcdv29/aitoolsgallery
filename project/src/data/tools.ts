export interface PricingTier {
  name: string;
  price: string;
  interval?: string;
  description: string;
  features: string[];
  buttonUrl?: string;
  buttonText?: string;
  popular?: boolean;
}

export interface PlatformLink {
  platform: string;
  url: string;
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  logoUrl: string;
  category: string;
  pricing: {
    type: 'free' | 'freemium' | 'paid';
    startingPrice?: string;
  };
  pricingTiers: PricingTier[];
  platforms: string[];
  platformLinks: PlatformLink[];
  company: {
    name: string;
    website: string;
  };
  features: string[];
  websiteUrl: string;
  featured?: boolean;
}

export const aiTools: AITool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'ChatGPT is an advanced language model that can engage in conversations, answer questions, and assist with various tasks.',
    shortDescription: 'Versatile AI chatbot for conversations and task assistance',
    imageUrl: 'https://images.unsplash.com/photo-1705048862715-be17c8507755',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    category: 'Language Models',
    pricing: {
      type: 'freemium',
      startingPrice: '$20/month'
    },
    pricingTiers: [
      {
        name: 'Free',
        price: '$0',
        description: 'Basic access to ChatGPT',
        features: [
          'Access to GPT-3.5',
          'Standard response speed',
          'Basic chat functionality',
          'Web-only access'
        ]
      },
      {
        name: 'Plus',
        price: '$20',
        interval: 'month',
        description: 'Enhanced features and capabilities',
        features: [
          'Access to GPT-4',
          'Faster response times',
          'Priority access during peak times',
          'Early access to new features',
          'Higher message limits'
        ],
        buttonUrl: 'https://chat.openai.com/auth/login',
        buttonText: 'Upgrade to Plus',
        popular: true
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Custom solutions for organizations',
        features: [
          'Custom model fine-tuning',
          'Advanced security features',
          'Dedicated support team',
          'Custom integrations',
          'Unlimited team members'
        ],
        buttonUrl: 'https://openai.com/enterprise',
        buttonText: 'Contact Sales'
      }
    ],
    platforms: ['Web', 'iOS', 'Android'],
    platformLinks: [
      {
        platform: 'Web',
        url: 'https://chat.openai.com'
      },
      {
        platform: 'iOS',
        url: 'https://apps.apple.com/us/app/chatgpt/id6448311069'
      },
      {
        platform: 'Android',
        url: 'https://play.google.com/store/apps/details?id=com.openai.chatgpt'
      }
    ],
    company: {
      name: 'OpenAI',
      website: 'https://openai.com'
    },
    features: [
      'Text Generation',
      'Code Assistance',
      'Creative Writing',
      'Task Automation',
      'Language Translation',
      'Educational Support'
    ],
    websiteUrl: 'https://chat.openai.com',
    featured: true
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'Midjourney is an AI-powered tool that generates high-quality images from text descriptions, perfect for artists, designers, and creative professionals.',
    shortDescription: 'AI image generation from text descriptions',
    imageUrl: 'https://images.unsplash.com/photo-1686191128892-3b37813f0fc4',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png',
    category: 'Image Generation',
    pricing: {
      type: 'paid',
      startingPrice: '$10/month'
    },
    pricingTiers: [
      {
        name: 'Basic',
        price: '$10',
        interval: 'month',
        description: 'Perfect for casual users',
        features: [
          '200 GPU minutes',
          'Standard image generation',
          'Basic queue priority',
          'Community support'
        ]
      },
      {
        name: 'Standard',
        price: '$30',
        interval: 'month',
        description: 'Most popular for professionals',
        features: [
          '900 GPU minutes',
          'Faster image generation',
          'Higher queue priority',
          'Private image generation',
          'Relaxed image grid'
        ],
        buttonUrl: 'https://www.midjourney.com/plans',
        buttonText: 'Choose Standard',
        popular: true
      },
      {
        name: 'Pro',
        price: '$60',
        interval: 'month',
        description: 'For power users',
        features: [
          '2000 GPU minutes',
          'Maximum speed generation',
          'Highest queue priority',
          'Stealth mode',
          'Team collaboration features'
        ],
        buttonUrl: 'https://www.midjourney.com/plans'
      }
    ],
    platforms: ['Discord', 'Web'],
    platformLinks: [
      {
        platform: 'Discord',
        url: 'https://discord.gg/midjourney'
      },
      {
        platform: 'Web',
        url: 'https://www.midjourney.com/app/'
      }
    ],
    company: {
      name: 'Midjourney',
      website: 'https://www.midjourney.com'
    },
    features: [
      'Text-to-Image Generation',
      'Style Customization',
      'High Resolution Output',
      'Variations Generation',
      'Commercial Usage Rights',
      'Community Features'
    ],
    websiteUrl: 'https://www.midjourney.com',
    featured: true
  }
];