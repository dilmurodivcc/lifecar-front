# Lifecar Frontend

Modern, responsive auto tuning website built with Next.js 15, TypeScript, and SCSS.

## 🚀 Features

- **Modern Design**: Clean, professional UI with dark/light theme support
- **Responsive**: Mobile-first design that works on all devices
- **Performance**: Optimized with Next.js 15 and modern build tools
- **Cookie-Free Maps**: Google Maps JavaScript API without cookies for better privacy
- **Internationalization**: Multi-language support (English, Uzbek, Russian)
- **Theme Switching**: Dynamic light/dark theme with smooth transitions

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS with CSS Variables
- **Icons**: React Icons
- **Maps**: Yandex Maps JavaScript API (cookie-free)
- **Package Manager**: Yarn

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/lifecar-frontend.git
cd lifecar-frontend
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables (optional):
```bash
# Create .env.local file if you want to use your own Yandex Maps API key
NEXT_PUBLIC_YANDEX_MAPS_API_KEY=your_yandex_maps_api_key_here
```

4. Run the development server:
```bash
yarn dev
```

## 🗺️ Yandex Maps Setup

### Features

- **Cookie-Free**: No tracking cookies, better privacy
- **Theme-Aware**: Automatically switches between light/dark styles
- **Custom Marker**: Uses red dot marker for Lifecar location
- **Responsive**: Works perfectly on all screen sizes
- **Uzbek Language**: Map interface in Uzbek language
- **Error Handling**: Graceful fallback if map fails to load

### API Key

The project uses a pre-configured Yandex Maps API key. For production, consider getting your own API key from [Yandex Cloud](https://cloud.yandex.com/).

## 🎨 Theme System

The app supports dynamic theme switching:

- **Light Theme**: Clean, bright interface
- **Dark Theme**: Modern dark interface
- **Auto-Save**: Theme preference is saved in localStorage
- **Smooth Transitions**: All theme changes are animated

## 🌐 Internationalization

Currently supports:
- 🇺🇸 English
- 🇺🇿 O'zbek
- 🇷🇺 Русский

## 📱 Pages

- **Home**: Hero section with services overview
- **Services**: Detailed service offerings
- **Shop**: Product catalog
- **About**: Company information
- **Contact**: Contact details and map

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
yarn build
yarn start
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router
├── components/          # React components
│   ├── home/           # Home page components
│   ├── layout/         # Layout components
│   └── ui/             # Reusable UI components
├── scss/               # Styles
│   ├── base/           # Base styles and variables
│   ├── components/     # Component styles
│   └── pages/          # Page-specific styles
└── i18n.ts             # Internationalization
```

## 🔧 Development

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

### Code Style

- TypeScript for type safety
- SCSS for styling with BEM methodology
- React functional components with hooks
- Responsive design principles

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@lifecar.com or create an issue on GitHub.

---

**Made with ❤️ by Lifecar Team**
