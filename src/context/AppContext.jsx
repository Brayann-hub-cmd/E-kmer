// src/context/AppContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Thème
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  // Langue
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'FRA';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const changeLanguage = (lang) => setLanguage(lang);

  // ========== TRADUCTIONS ==========
  const translations = {
    FRA: {
      // --- Navbar ---
      search: "Rechercher un produit",
      allCategories: "Toutes les catégories",
      login: "Se connecter",
      register: "S'inscrire",
      logout: "Se déconnecter",
      cart: "Panier",
      profile: "Mon profil",

      // --- Home ---
      discover: "Découvrez des articles",
      sellYourItems: "Vendez vos articles",
      explore: "Explorer les articles",
      recentConsultations: "Consultations récentes",
      noRecentArticles: "Vous n'avez pas encore consulté d'articles.",
      ourProducts: "Nos Produits",
      discoverDesc: "Trouvez les meilleurs articles près de chez vous",
      findArticles: "Trouver des articles",
      exploreArticles: "Explorer tous les articles",
      sellDesc: "Mettez vos produits en vente en quelques clics",
      sellNow: "Vendre maintenant",
      howToSell: "Comment vendre ?",
      howToBuy: "Comment acheter ?",
      startSelling: "Commencer à vendre",
      orders: "Mes commandes",

      // --- Product ---
      price: "Prix",
      stock: "Stock",
      addToCart: "Ajouter au panier",
      buyNow: "Acheter maintenant",
      favorites: "Favoris",
      description: "Description",
      noDescription: "Aucune description disponible.",
      aboutSeller: "À propos du vendeur",
      memberSince: "Membre depuis",
      viewDetails: "Voir les détails",
      BackToHome: "Retour à l'accueil",

      // --- User ---
      mySales: "Mes ventes",
      myPurchases: "Mes achats",
      myFavorites: "Mes favoris",
      myArticles: "Mes articles",
      settings: "Paramètres",
      noProducts: "Vous n'avez aucun produit en vente.",
      publishProduct: "Publier un produit",
      noPurchases: "Vous n'avez pas encore effectué d'achats.",
      noFavorites: "Vous n'avez pas encore de favoris.",
      addFavorites: "Ajoutez des produits en favoris en cliquant sur le ❤️",
      myProductsOnSale: "Mes produits en vente",
      addFavoritesHint: "Ajoutez des produits en favoris en cliquant sur le ❤️",

      // --- Settings ---
      accountSettings: "Paramètres du compte",
      profilePhoto: "Photo de profil",
      changePhoto: "Changer la photo",
      removePhoto: "Supprimer",
      uploading: "Téléchargement en cours...",
      personalInfo: "Informations personnelles",
      fullName: "Nom complet",
      email: "Email",
      phone: "Numéro de téléphone",
      sellerMode: "Mode vendeur",
      storeName: "Nom de la boutique",
      storeDescription: "Description de la boutique",
      save: "Sauvegarder",
      saving: "Sauvegarde...",
      edit: "Modifier",
      cancel: "Annuler",

      // --- Cart ---
      cartTitle: "Mon Panier",
      emptyCart: "Votre panier est vide",
      subtotal: "Sous-total",
      delivery: "Livraison",
      total: "TOTAL",
      checkout: "Procéder au paiement",
      continueShopping: "Continuer mes achats",
      inStock: "en stock",
      outOfStock: "⚠️ Rupture de stock",
      stockWarning: "Plus que {stock} en stock !",
      remove: "Supprimer",
      itemInCart: "article dans votre panier",
      itemsInCart: "articles dans votre panier",

      // --- Payment ---
      payment: "Paiement",
      paymentSubtitle: "Choisissez votre mode de paiement",
      finalizeOrder: "Finaliser la commande",
      deliveryMode: "Mode de livraison",
      deliveryAddress: "Adresse de livraison",
      deliveryService: "Service de livraison",
      paymentMethod: "Méthode de paiement",
      mobileMoney: "Paiement Mobile Money",
      operator: "Opérateur",
      phoneNumber: "Numéro de téléphone",
      amountToPay: "Montant à payer",
      payNow: "Payer maintenant",
      processing: "Traitement...",
      pickup: "Retrait en magasin",
      storePickup: "Retrait en magasin",
      storePickupDesc: "Récupérez votre commande directement dans notre boutique",
      homeDelivery: "Livraison à domicile",
      homeDeliveryDesc: "Recevez votre commande à domicile",
      free: "Gratuit",
      estimatedFees: "Frais estimés",
      from: "À partir de",
      fromPrice: "À partir de",
      continue: "Continuer",
      back: "Retour",
      validateAndPay: "Valider et payer",
      city: "Ville",
      Sélectionnez: "Sélectionner",
      neighborhood: "Quartier",
      fullAddress: "Adresse complète",
      "Bonamoussadi, Rue X": "Bonamoussadi, Rue X",
      "Immeuble, appartement...": "Immeuble, appartement...",
      "Yoomee Delivery": "Yoomee Delivery",
      "Campost Express": "Campost Express",
      "DHL Cameroun": "DHL Cameroun",
      "MotoExpress": "MotoExpress",
      deliveryTime: "Délai de livraison",

      // --- Order summary ---
      orderSummary: "Récapitulatif de votre commande",
      deliveryAddressLabel: "Adresse de livraison",
      pickupStore: "Retrait en magasin",
      pickupLocation: "E-kmer Store, Douala Bonamoussadi",

      // --- Footer & Pages footer ---
      about: "À propos",
      howItWorks: "Comment ça marche",
      security: "Sécurité",
      help: "Centre d'aide",
      terms: "Conditions d'utilisation",
      privacy: "Politique de confidentialité",
      category: "Catégorie",
      usefulLinks: "Liens utiles",
      sellAndBuy: "Vendre et acheter",
      sellAndBuyTagline: "Achetez et vendez en toute sécurité sur E-kmer",
      contact: "Contact",
      allRightsReserved: "Tous droits réservés",
      followUs: "Suivez-nous",

      // À propos
      aboutEkmers: "À propos d'E-kmer",
      ourMission: "Notre mission",
      missionDescription: "Faciliter l'achat et la vente de biens d'occasion dans un cadre sécurisé, simple et transparent.",
      ourHistory: "Notre histoire",
      historyDescription: "E-kmer est né du constat que l'achat et la vente d'occasion est souvent compliquée. Nous avons voulu créer une plateforme de confiance pour tous au Cameroun et au-delà.",
      ourValues: "Nos valeurs",
      valueTrust: "La confiance",
      valueProximity: "La proximité",
      valueSimplicity: "La simplicité",
      valuePride: "La fierté du commerce local",

      // Contact
      Contact: "Contact",
      doualaCameroon: "Douala, Cameroun",

      // Comment ça marche – acheteurs
      forBuyers: "Pour les acheteurs",
      "1": "1. Parcourir les annonces",
      browseAds: "Parcourir les annonces",
      browseAdsDesc: "Explorez des milliers d'articles par catégorie, ville ou prix.",
      "2": "2. Ajouter au panier",
      addToCartDesc: "Ajoutez les articles à votre panier et préparez votre commande.",
      "3": "3. Procéder au paiement",
      checkoutDesc: "Payez en toute sécurité et choisissez la livraison ou le retrait.",

      // Comment ça marche – vendeurs
      forSellers: "Pour les vendeurs",
      createAccountDesc: "Créez votre compte et configurez votre boutique.",
      publishItems: "Publier des articles",
      publishItemsDesc: "Ajoutez des photos, des descriptions et fixez votre prix.",
      manageSales: "Gérer les ventes",
      manageSalesDesc: "Suivez vos ventes et communiquez avec les acheteurs.",

      // Sécurité
      securityTitle: "Sécurité et confidentialité",
      dataProtected: "Vos données sont protégées",
      dataProtectedDesc: "Nous utilisons un chiffrement avancé pour protéger vos informations personnelles.",
      securityTips: "Conseils de sécurité",
      securityTip1: "Ne partagez jamais votre mot de passe ou votre code PIN avec qui que ce soit.",
      securityTip2: "Utilisez un mot de passe fort et unique pour votre compte.",
      securityTip3: "Méfiez-vous des liens suspects ou des offres trop alléchantes.",
      securityTip4: "Vérifiez toujours l'identité de l'acheteur ou du vendeur avant de finaliser une transaction.",
      securityAlert: "Si vous remarquez une activité suspecte, contactez immédiatement notre support.",

      // Centre d'aide
      helpCenter: "Centre d'aide",
      helpCenterSubtitle: "Trouvez des réponses à toutes vos questions sur l'achat et la vente sur E-kmer.",
      faq1Question: "Comment créer un compte ?",
      faq2Question: "Comment publier une annonce ?",
      faq3Question: "Comment payer mon achat ?",
      faq4Question: "Quels sont les moyens de paiement acceptés ?",
      faq5Question: "Comment contacter le vendeur ?",
      helpNotFound: "Vous ne trouvez pas ce que vous cherchez ? Contactez-nous directement.",

      // Conditions d'utilisation
      termsTitle: "Conditions d'utilisation",
      termsAcceptance: "Acceptation des conditions",
      termsAcceptanceDesc: "En utilisant E-kmer, vous acceptez l'intégralité des présentes conditions générales.",
      userAccount: "Compte utilisateur",
      userAccountDesc: "Vous êtes responsable de la confidentialité de votre compte et de votre mot de passe.",
      prohibitedAds: "Annonces interdites",
      prohibitedAdsDesc: "Il est interdit de publier des annonces pour des produits illégaux, contrefaits ou dangereux.",
      transactions: "Transactions",
      transactionsDesc: "Toutes les transactions sont définitives après la livraison. Nous ne sommes pas responsables des litiges entre utilisateurs.",
      Livraison: "Livraison",
      deliveryDesc: "Les délais et frais de livraison dépendent du service sélectionné et de l'adresse de livraison.",
      buyerSellerRelation: "Relation acheteur-vendeur",
      buyerSellerRelationDesc: "E-kmer est une marketplace mettant en relation acheteurs et vendeurs. Nous ne sommes pas partie prenante à la transaction.",

      // Confidentialité
      privacyTitle: "Politique de confidentialité",
      dataCollection: "Collecte de données",
      dataCollectionDesc: "Nous collectons des informations personnelles (nom, téléphone, email) pour créer votre compte et traiter vos commandes.",
      dataUsage: "Utilisation des données",
      dataUsageDesc: "Vos données sont utilisées uniquement pour fournir nos services et améliorer votre expérience.",
      cookies: "Cookies",
      cookiesDesc: "Nous utilisons des cookies pour optimiser votre navigation. Vous pouvez gérer vos préférences dans les paramètres de votre navigateur.",

      // --- Auth ---
      loginTitle: "Connexion à E-kmer",
      registerTitle: "Inscription à E-kmer",
      loginSubtitle: "Accédez à votre compte pour continuer",
      registerSubtitle: "Créez votre compte pour commencer à acheter et vendre",
      withPhone: "Avec votre téléphone",
      withEmail: "Avec votre email",
      phonePlaceholder: "6XX XXX XXX",
      emailPlaceholder: "votre@email.com",
      passwordPlaceholder: "••••••••",
      rememberMe: "Se souvenir de moi",
      forgotPassword: "Mot de passe oublié ?",
      noAccount: "Vous n'avez pas de compte ?",
      hasAccount: "Vous avez déjà un compte ?",
      createAccount: "Créer un compte",
      signIn: "Se connecter",
      signUp: "S'inscrire",

      // --- Publish Product ---
      publishTitle: "Publier un produit",
      publishSubtitle: "Remplissez les informations pour mettre votre produit en vente",
      step1: "Etape 1 : Sélectionnez la catégorie principal",
      step2: "Etape 2 : Précisez le type de produit",
      chooseCategory: "-- Choisir une catégorie --",
      chooseType: "-- Choisir un type --",
      chooseCity: "Sélectionner une ville",
      productName: "Nom du produit",
      productPrice: "Prix (FCFA)",
      productDescription: "Description",
      productStock: "Stock",
      productCity: "Ville",
      productImage: "Image du produit",
      addImage: "Ajouter",
      clickToAddImage: "Cliquez pour ajouter une image",
      maxImages: "Maximum 3 images, format jpg/png",
      publish: "Publier le produit",
      publishing: "Publication...",
      cancelPublish: "Annuler",
      required: "Champ requis",
      minChars: "Minimum 3 caractères",
      min20Chars: "Minimum 20 caractères",
      validPrice: "Prix valide requis",
      validStock: "Stock valide requis",
      selectCity: "Veuillez sélectionner une ville",
      atLeastOneImage: "Au moins une image requise",
      max3Images: "Maximum 3 images autorisées",

      // --- Catégorie Page ---
      searchCategories: "Rechercher par Catégories",
      noSubCategories: "Aucune sous-catégorie trouvée.",
      noSubCategoriesDesc: "Cette catégorie n'a pas encore de sous-catégories.",
      allProducts: "Tous les produits",
      discoverAllProducts: "Découvrez tous les produits disponibles sur la plateforme",
      searchProduct: "Rechercher un produit...",
      noProductsFound: "Aucun produit trouvé",
      resetFilters: "Réinitialiser les filtres",
      productsFound: "produit(s) trouvé(s)",

      // --- Errors ---
      errorLoading: "Erreur de chargement",
      tryAgain: "Réessayer",
      serverError: "Un problème avec le serveur est survenu",
      connectionError: "Erreur de connexion",

      // --- Success ---
      successPublish: "Annonce publiée avec succès !",
      successAddToCart: "ajouté au panier !",
      successRemove: "Article supprimé du panier",
      successUpdate: "Profil mis à jour avec succès !",

      // --- Divers (avatar, login) ---
      welcomeMessage: "Bienvenue {username} !",
      invalidEmailPassword: "Email ou mot de passe incorrect.",
      invalidPhonePassword: "Téléphone ou mot de passe incorrect.",
      accountNotFound: "Compte introuvable.",
      clickToChangeAvatar: "Cliquez sur la photo pour changer",
      invalidImage: "Veuillez sélectionner une image valide.",
      imageTooLarge: "L'image ne doit pas dépasser 5 Mo.",
      avatarUpdated: "Photo de profil mise à jour !",
      uploadError: "Erreur lors de l'upload.",
    },

    ENG: {
      // --- Navbar ---
      search: "Search for a product",
      allCategories: "All categories",
      login: "Log in",
      register: "Sign up",
      logout: "Log out",
      cart: "Cart",
      profile: "My profile",

      // --- Home ---
      discover: "Discover items",
      sellYourItems: "Sell your items",
      explore: "Explore items",
      recentConsultations: "Recent consultations",
      noRecentArticles: "You haven't consulted any items yet.",
      ourProducts: "Our Products",
      discoverDesc: "Find the best items near you",
      findArticles: "Find items",
      exploreArticles: "Explore all items",
      sellDesc: "List your products in a few clicks",
      sellNow: "Sell now",
      howToSell: "How to sell?",
      howToBuy: "How to buy?",
      startSelling: "Start selling",
      orders: "My orders",

      // --- Product ---
      price: "Price",
      stock: "Stock",
      addToCart: "Add to cart",
      buyNow: "Buy now",
      favorites: "Favorites",
      description: "Description",
      noDescription: "No description available.",
      aboutSeller: "About the seller",
      memberSince: "Member since",
      viewDetails: "View details",
      BackToHome: "Back to home",

      // --- User ---
      mySales: "My sales",
      myPurchases: "My purchases",
      myFavorites: "My favorites",
      myArticles: "My items",
      settings: "Settings",
      noProducts: "You have no products for sale.",
      publishProduct: "List a product",
      noPurchases: "You haven't made any purchases yet.",
      noFavorites: "You don't have any favorites yet.",
      addFavorites: "Add products to favorites by clicking on ❤️",
      myProductsOnSale: "My products on sale",
      addFavoritesHint: "Add products to favorites by clicking on ❤️",

      // --- Settings ---
      accountSettings: "Account settings",
      profilePhoto: "Profile photo",
      changePhoto: "Change photo",
      removePhoto: "Remove",
      uploading: "Uploading...",
      personalInfo: "Personal information",
      fullName: "Full name",
      email: "Email",
      phone: "Phone number",
      sellerMode: "Seller mode",
      storeName: "Store name",
      storeDescription: "Store description",
      save: "Save",
      saving: "Saving...",
      edit: "Edit",
      cancel: "Cancel",

      // --- Cart ---
      cartTitle: "My Cart",
      emptyCart: "Your cart is empty",
      subtotal: "Subtotal",
      delivery: "Delivery",
      total: "TOTAL",
      checkout: "Go to checkout",
      continueShopping: "Keep shopping",
      inStock: "in stock",
      outOfStock: "⚠️ Out of stock",
      stockWarning: "Only {stock} left in stock!",
      remove: "Remove",
      itemInCart: "item in your cart",
      itemsInCart: "items in your cart",

      // --- Payment ---
      payment: "Payment",
      paymentSubtitle: "Choose your payment method",
      finalizeOrder: "Finalize your order",
      deliveryMode: "Delivery mode",
      deliveryAddress: "Delivery address",
      deliveryService: "Delivery service",
      paymentMethod: "Payment method",
      mobileMoney: "Mobile Money Payment",
      operator: "Operator",
      phoneNumber: "Phone number",
      amountToPay: "Amount to pay",
      payNow: "Pay now",
      processing: "Processing...",
      pickup: "Store pickup",
      storePickup: "Store pickup",
      storePickupDesc: "Pick up your order directly from our store",
      homeDelivery: "Home delivery",
      homeDeliveryDesc: "Receive your order at home",
      free: "Free",
      estimatedFees: "Estimated fees",
      from: "From",
      fromPrice: "From",
      continue: "Continue",
      back: "Back",
      validateAndPay: "Validate and pay",
      city: "City",
      Sélectionnez: "Select",
      neighborhood: "Neighborhood",
      fullAddress: "Full address",
      "Bonamoussadi, Rue X": "Bonamoussadi, X Street",
      "Immeuble, appartement...": "Building, apartment...",
      "Yoomee Delivery": "Yoomee Delivery",
      "Campost Express": "Campost Express",
      "DHL Cameroun": "DHL Cameroun",
      "MotoExpress": "MotoExpress",
      deliveryTime: "Delivery time",

      // --- Order summary ---
      orderSummary: "Order summary",
      deliveryAddressLabel: "Delivery address",
      pickupStore: "Store pickup",
      pickupLocation: "E-kmer Store, Douala Bonamoussadi",

      // --- Footer & Pages footer ---
      about: "About",
      howItWorks: "How it works",
      security: "Security",
      help: "Help center",
      terms: "Terms of use",
      privacy: "Privacy policy",
      category: "Category",
      usefulLinks: "Useful links",
      sellAndBuy: "Sell and buy",
      sellAndBuyTagline: "Buy and sell safely on E-kmer",
      contact: "Contact",
      allRightsReserved: "All rights reserved",
      followUs: "Follow us",

      // À propos
      aboutEkmers: "About E-kmer",
      ourMission: "Our Mission",
      missionDescription: "Facilitate the buying and selling of second-hand goods in a secure, simple, and transparent environment.",
      ourHistory: "Our History",
      historyDescription: "E-kmer was born from the observation that buying and selling second-hand items is often complicated. We wanted to create a trusted platform for everyone in Cameroon and beyond.",
      ourValues: "Our Values",
      valueTrust: "Trust",
      valueProximity: "Proximity",
      valueSimplicity: "Simplicity",
      valuePride: "Pride in local commerce",

      // Contact
      Contact: "Contact",
      doualaCameroon: "Douala, Cameroon",

      // Comment ça marche – pour les acheteurs
      forBuyers: "For Buyers",
      "1": "1. Browse ads",
      browseAds: "Browse ads",
      browseAdsDesc: "Explore thousands of items by category, city, or price.",
      "2": "2. Add to cart",
      addToCartDesc: "Add items to your cart and prepare your order.",
      "3": "3. Checkout",
      checkoutDesc: "Pay securely and choose delivery or pickup.",

      // Comment ça marche – pour les vendeurs
      forSellers: "For Sellers",
      createAccountDesc: "Create your account and set up your store.",
      publishItems: "Publish items",
      publishItemsDesc: "Add photos, descriptions, and set your price.",
      manageSales: "Manage sales",
      manageSalesDesc: "Track your sales and communicate with buyers.",

      // Sécurité
      securityTitle: "Security & Privacy",
      dataProtected: "Your data is protected",
      dataProtectedDesc: "We use advanced encryption to protect your personal information.",
      securityTips: "Security tips",
      securityTip1: "Never share your password or PIN with anyone.",
      securityTip2: "Use a strong, unique password for your account.",
      securityTip3: "Avoid suspicious links or offers that seem too good to be true.",
      securityTip4: "Always verify the identity of the buyer or seller before completing a transaction.",
      securityAlert: "If you notice suspicious activity, contact our support immediately.",

      // Centre d'aide
      helpCenter: "Help Center",
      helpCenterSubtitle: "Find answers to all your questions about buying and selling on E-kmer.",
      faq1Question: "How do I create an account?",
      faq2Question: "How do I publish an ad?",
      faq3Question: "How do I pay for my purchase?",
      faq4Question: "What payment methods are accepted?",
      faq5Question: "How do I contact the seller?",
      helpNotFound: "Can't find what you're looking for? Contact us directly.",

      // Conditions d'utilisation
      termsTitle: "Terms of Use",
      termsAcceptance: "Acceptance of Terms",
      termsAcceptanceDesc: "By using E-kmer, you agree to these terms and conditions in their entirety.",
      userAccount: "User Account",
      userAccountDesc: "You are responsible for maintaining the confidentiality of your account and password.",
      prohibitedAds: "Prohibited Ads",
      prohibitedAdsDesc: "It is forbidden to publish ads for illegal, counterfeit, or dangerous products.",
      transactions: "Transactions",
      transactionsDesc: "All transactions are final after delivery. We are not responsible for disputes between users.",
      Livraison: "Delivery",
      deliveryDesc: "Delivery times and costs depend on the selected service and the delivery address.",
      buyerSellerRelation: "Buyer-Seller Relationship",
      buyerSellerRelationDesc: "E-kmer is a marketplace connecting buyers and sellers. We are not a party to the transaction.",

      // Confidentialité
      privacyTitle: "Privacy Policy",
      dataCollection: "Data collection",
      dataCollectionDesc: "We collect personal information (name, phone, email) to create your account and process orders.",
      dataUsage: "Data usage",
      dataUsageDesc: "Your data is used only to provide our services and improve your experience.",
      cookies: "Cookies",
      cookiesDesc: "We use cookies to optimize your browsing experience. You can manage your preferences in your browser settings.",

      // --- Auth ---
      loginTitle: "Log in to E-kmer",
      registerTitle: "Sign up to E-kmer",
      loginSubtitle: "Access your account to continue",
      registerSubtitle: "Create your account to start buying and selling",
      withPhone: "With your phone",
      withEmail: "With your email",
      phonePlaceholder: "6XX XXX XXX",
      emailPlaceholder: "your@email.com",
      passwordPlaceholder: "••••••••",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      createAccount: "Create account",
      signIn: "Log in",
      signUp: "Sign up",

      // --- Publish Product ---
      publishTitle: "List a product",
      publishSubtitle: "Fill in the information to put your product on sale",
      step1: "Step 1: Select the main category",
      step2: "Step 2: Specify the product type",
      chooseCategory: "-- Choose a category --",
      chooseType: "-- Choose a type --",
      chooseCity: "Select a city",
      productName: "Product name",
      productPrice: "Price (FCFA)",
      productDescription: "Description",
      productStock: "Stock",
      productCity: "City",
      productImage: "Product image",
      addImage: "Add",
      clickToAddImage: "Click to add an image",
      maxImages: "Maximum 3 images, jpg/png format",
      publish: "List product",
      publishing: "Listing...",
      cancelPublish: "Cancel",
      required: "Required field",
      minChars: "Minimum 3 characters",
      min20Chars: "Minimum 20 characters",
      validPrice: "Valid price required",
      validStock: "Valid stock required",
      selectCity: "Please select a city",
      atLeastOneImage: "At least one image required",
      max3Images: "Maximum 3 images allowed",

      // --- Catégorie Page ---
      searchCategories: "Search by Categories",
      noSubCategories: "No sub-category found.",
      noSubCategoriesDesc: "This category does not have sub-categories yet.",
      allProducts: "All products",
      discoverAllProducts: "Discover all products available on the platform",
      searchProduct: "Search for a product...",
      noProductsFound: "No products found",
      resetFilters: "Reset filters",
      productsFound: "product(s) found",

      // --- Errors ---
      errorLoading: "Loading error",
      tryAgain: "Try again",
      serverError: "A server problem occurred",
      connectionError: "Connection error",

      // --- Success ---
      successPublish: "Product listed successfully!",
      successAddToCart: "Added to cart!",
      successRemove: "Item removed from cart",
      successUpdate: "Profile updated successfully!",

      // --- Divers ---
      welcomeMessage: "Welcome {username}!",
      invalidEmailPassword: "Invalid email or password.",
      invalidPhonePassword: "Invalid phone or password.",
      accountNotFound: "Account not found.",
      clickToChangeAvatar: "Click on the photo to change",
      invalidImage: "Please select a valid image.",
      imageTooLarge: "Image must not exceed 5 MB.",
      avatarUpdated: "Profile picture updated!",
      uploadError: "Upload error.",
    }
  };

  const t = translations[language] || translations.FRA;

  return (
    <AppContext.Provider value={{
      isDarkMode,
      toggleTheme,
      language,
      changeLanguage,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
};