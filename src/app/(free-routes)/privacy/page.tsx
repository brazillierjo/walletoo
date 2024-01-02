const Privacy: React.FC = () => {
  return (
    <div className="py-4 lg:py-16">
      <div className="container mx-auto rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <h1 className="mb-6 text-3xl font-semibold">Politique de Confidentialité</h1>

        <p className="mb-4">
          Bienvenue sur Walletoo ! Cette politique de confidentialité décrit comment nous collectons, utilisons et
          protégeons vos informations personnelles lorsque vous utilisez notre site web.
        </p>

        <p className="mb-4">
          En utilisant Walletoo, vous consentez à cette politique de confidentialité. N'utilisez pas Walletoo si vous
          n'êtes pas d'accord avec les termes de cette politique.
        </p>

        <h2 className="mb-4 text-xl font-semibold">Informations que nous collectons</h2>

        <p className="mb-4">
          Nous collectons des informations telles que votre nom, votre adresse e-mail et des données d'utilisation
          lorsque vous interagissez avec notre site web.
        </p>

        <h2 className="mb-4 text-xl font-semibold">Utilisation de l'Oauth avec GitHub et Google</h2>

        <p className="mb-4">
          Walletoo utilise exclusivement l'authentification Oauth avec GitHub et Google pour la connexion. Nous stockons
          le nom, l'avatar et l'adresse e-mail provenant de ces services. Veuillez noter que ces informations ne peuvent
          pas être modifiées depuis Walletoo.
        </p>

        <h2 className="mb-4 text-xl font-semibold">Utilisation de vos informations</h2>

        <p className="mb-4">
          Nous utilisons vos informations pour améliorer notre site web, personnaliser votre expérience et vous envoyer
          des informations pertinentes.
        </p>

        <h2 className="mb-4 text-xl font-semibold">Partage des informations</h2>

        <p className="mb-4">
          Nous tenons à souligner que Walletoo ne partage absolument aucune de vos informations personnelles avec des
          tiers.
        </p>

        <h2 className="mb-4 text-xl font-semibold">Suppression de compte et réinitialisation des données</h2>

        <p className="mb-4">
          Vous avez la possibilité de supprimer votre compte à tout moment ou de réinitialiser vos données depuis les
          paramètres de votre compte sur Walletoo.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
