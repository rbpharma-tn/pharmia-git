
import { MemoFiches } from './types';

// Using picsum.photos for placeholder images where Google Drive links were used.
// Keeping placehold.co for Cystite as it was already a placeholder.
export const memoFichesData: MemoFiches = {
  'candidose': {
    title: "Candidose Vaginale",
    image: "https://picsum.photos/seed/candidose/600/400",
    memoData: [
      { title: "Cas comptoir", content: "Une femme de 26 ans se présente à l'officine :\n\n« J'ai des brûlures et des démangeaisons vaginales »\n\nSignes associés :\nPertes blanchâtres grumeleuses\nDyspareunie (douleurs lors des rapports)\nÉrythème vulvaire", type: "section" },
      { title: "Questions à poser", content: "1. Depuis combien de temps ces symptômes ?\n2. Nature des pertes (couleur, odeur) ?\n3. Brûlures mictionnelles associées ?\n4. Grossesse ou contraception hormonale ?\n5. Fièvre/douleurs pelviennes ?\n6. Premier épisode ou récidive ?\n7. Traitements en cours (antibiotiques, corticoïdes) ?\n8. Antécédents de mycoses ?", type: "section" },
      { title: "Quand orienter vers le médecin", content: "Orientation nécessaire si :\n\nPatiente enceinte\nSymptômes persistants sous traitement\nRécidives fréquentes (>4 épisodes/an)\nSignes généraux (fièvre, frissons)\nDouleurs pelviennes\nPertes purulentes/malodorantes\nÉchec de 2 traitements bien conduits", type: "section" },
      { title: "Pathologie et signes typiques", content: "Candidose vulvo-vaginale :\n\nAgent : Candida albicans (90%)\nSignes pathognomoniques :\n• Prurit vulvaire intense\n• Leucorrhées blanchâtres « fromage blanc »\n• Brûlures mictionnelles terminales\n• Vulve érythèmeuse\n\nFacteurs favorisants :\nAntibiotiques, diabète\nGrossesse, œstrogènes\nImmunodépression", type: "section" },
      { title: "Conseils produits", content: "Traitements antifongiques :\n\nOvule éconazole 150mg (1/j le soir au coucher pendant 3 à 6 jours)\nCrème antifongique 2x/j (7j)\n\nProduits associés :\nGel lavant pH alcalin (max 14j)\nProbiotiques vaginaux\nOvules hydratantes (post-traitement)\n\nNB : Pas de traitement systématique du partenaire", type: "section" },
      { title: "Hygiène de vie", content: "Conseils à dispenser :\n\nSous-vêtements 100% coton\nÉviter vêtements serrés\nHygiène douce sans savon parfumé\nSéchage minutieux après toilette\nEssuyage antéro-postérieur\nÉviter bains/jacuzzi prolongés\nChangement fréquent des protège-slips\nLavage du linge à 60°C minimum", type: "section" },
      { title: "Références bibliographiques", content: "Sources: Goodman & Gilman's The Pharmacological Basis of Therapeutics, 13th Ed. (2018).\nEuropean Centre for Disease Prevention and Control (ECDC) Guidelines on candidiasis (2019).\nRecommandations HAS (Haute Autorité de Santé) sur la prise en charge de la candidose vulvo-vaginale (2020).", type: "section" }
    ],
    flashcardsData: [
      { question: "Agent principal responsable ?", answer: "Candida albicans (90% des cas)" },
      { question: "Signe le plus spécifique ?", answer: "Pertes blanchâtres grumeleuses 'fromage blanc'" },
      { question: "Durée traitement local standard ?", answer: "3 jours (ovule) ou 7 jours (crème)" },
      { question: "Facteurs favorisants majeurs ?", answer: "Prise d'antibiotiques, grossesse, diabète." },
      { question: "Quel pH pour gel lavant?", answer: "pH alcalin, usage max 14j." },
      { question: "Fréquence des récidives pour orientation médecin ?", answer: "> 4 épisodes par an." },
      { question: "Hygiène vestimentaire recommandée ?", answer: "Sous-vêtements 100% coton, éviter vêtements serrés." },
    ],
    quizQuestionsData: [
      { question: "Quel est le principal agent pathogène responsable de la candidose vulvo-vaginale ?", options: ["Gardnerella vaginalis", "Candida albicans", "Trichomonas vaginalis", "Escherichia coli"], answer: 1, explanation: "La candidose vulvo-vaginale est principalement causée par la levure Candida albicans dans 90% des cas." },
      { question: "Quel symptôme est le plus fréquemment associé à la candidose vulvo-vaginale ?", options: ["Douleur pelvienne intense", "Fièvre et frissons", "Prurit vulvaire intense", "Pertes jaunes malodorantes"], answer: 2, explanation: "Le prurit vulvaire intense (démangeaisons) est l'un des symptômes les plus fréquents." },
      { question: "Quelle est la durée maximale recommandée pour l'utilisation d'un gel lavant à pH alcalin en cas de candidose ?", options: ["3 jours", "7 jours", "14 jours", "1 mois"], answer: 2, explanation: "Un gel lavant à pH alcalin doit être utilisé au maximum 14 jours." },
      { question: "Parmi les facteurs suivants, lequel n'est PAS un facteur favorisant de la candidose ?", options: ["Grossesse", "Prise d'antibiotiques", "Immunodépression", "Activité physique intense"], answer: 3, explanation: "L'activité physique intense n'est pas un facteur favorisant connu de la candidose." },
      { question: "Quel est le symptôme vaginal qui caractérise le mieux la candidose ?", options: ["Pertes verdâtres et mousseuses", "Sècheresse vaginale", "Pertes blanchâtres grumeleuses", "Saignements intermenstruels"], answer: 2, explanation: "Les pertes blanchâtres grumeleuses, comparées à du 'fromage blanc', sont très caractéristiques de la candidose." },
      { question: "Pourquoi le traitement systématique du partenaire n'est-il généralement pas recommandé ?", options: ["Il est insensible au traitement", "La transmission est rare", "Cela favorise les résistances", "Le diagnostic est difficile chez l'homme"], answer: 1, explanation: "Le traitement systématique du partenaire n'est pas recommandé car la candidose n'est pas considérée comme une IST et la transmission est rare." },
      { question: "Quand une patiente doit-elle être orientée vers un médecin en cas de candidose ?", options: ["Première démangeaison", "Symptômes depuis 24h", "Fièvre ou douleurs pelviennes", "Utilisation d'un ovule"], answer: 2, explanation: "La présence de signes généraux comme la fièvre ou des douleurs pelviennes nécessite une orientation médicale." },
      { question: "Quel type de sous-vêtements est conseillé pour prévenir la candidose ?", options: ["Synthétiques", "Soyeux", "100% coton", "N'importe quel type"], answer: 2, explanation: "Les sous-vêtements en coton permettent une meilleure aération et réduisent l'humidité, défavorable au développement du Candida." },
      { question: "Quelle est une recommandation d'hygiène pour la toilette intime ?", options: ["Utiliser des savons parfumés", "Se laver plusieurs fois par jour", "Essuyage antéro-postérieur", "Éviter de sécher minutieusement"], answer: 2, explanation: "L'essuyage antéro-postérieur (de l'avant vers l'arrière) est crucial pour éviter le transfert de germes de l'anus vers le vagin." },
      { question: "En cas d'échec d'un traitement bien conduit, combien de traitements la patiente doit-elle avoir essayé avant une orientation médicale ?", options: ["Un échec", "Deux échecs", "Trois échecs", "Quatre échecs"], answer: 1, explanation: "L'échec de deux traitements bien conduits (même en automédication) doit inciter à une consultation médicale." }
    ],
    glossaryTerms: ["Candidose vulvo-vaginale", "Candida albicans", "Prurit vulvo-vaginale", "Leucorrhées", "Dyspareunie", "Antifongique", "Probiotiques", "Érythème", "Ovule", "Vaginite"],
    kahootLink: "https://kahoot.it/challenge/001115080?challenge-id=ce72474c-f579-45bb-9168-e288af0db70d_1723784845005",
    youtubeVideos: [{ title: "Comprendre la Candidose", url: "https://www.youtube.com/embed/xtMbZ1IbDjM" }],
    podcastLink: "https://notebooklm.google.com/notebook/418259fb-55ae-49ae-aee8-605887d34bc3/audio"
  },
  'cystite': {
    title: "Cystite",
    image: "https://placehold.co/600x400/808080/FFFFFF?text=Cystite+Image", 
    memoData: [
        {
            title: "Cas comptoir",
            content: "Une patiente de 32 ans se présente à la pharmacie: “J’ai des brûlures quand j’urine, je veux une boite de Fosfomycine”", type: "section"
        },
        {
            title: "Questions à poser",
            content: "Depuis quand ressentez-vous ces symptômes ?\nAvez-vous de la fièvre, des frissons ou des douleurs lombaires ?\nEst-ce la première fois ou est-ce récurrent (plus de 4 épisodes par an) ?\nÊtes-vous enceinte ou allaitante ?\nPrenez-vous actuellement des médicaments ?\nSouffrez-vous d’un diabète ou d’une pathologie rénale ?\nY a-t-il du sang dans vos urines ?", type: "section"
        },
        {
            title: "Informations sur la maladie ou les symptômes",
            content: "La cystite est une inflammation de la vessie, généralement d'origine bactérienne (Escherichia coli dans 70-95% des cas). Elle touche principalement les femmes entre 20 et 50 ans.\n\nPrincipaux symptômes :\nBrûlures ou douleurs en urinant\nSensation de poids ou douleurs dans le bas-ventre\nBesoins pressants et fréquents d'uriner (impériosité mictionnelle)\nPollakiurie (émission fréquente de petites quantités d'urine)\nUrines troubles, odeur inhabituelle, parfois avec du sang (hématurie)", type: "section"
        },
        {
            title: "Pourquoi la cystite est-elle plus fréquente chez la femme ?",
            content: "Urètre féminin plus court.\nProximité du méat urinaire avec l'anus.\nActivité sexuelle.\nChangements hormonaux (grossesse, ménopause).\nUtilisation de spermicides.\nGrossesse (compression de l'uretère, modifications pH).", type: "section"
        },
        {
            title: "Quand orienter vers le médecin ?",
            content: "Fièvre, frissons ou douleurs lombaires (suspicion de pyélonéphrite)\nGrossesse\nPersistance des symptômes au-delà de 24-48h\nCystites récidivantes (> 4 épisodes/an)\nPrésence de facteurs de risque de complications\nCystite chez l’enfant ou l’homme", type: "section"
        },
        {
            title: "Conseils spécifiques liés aux traitements",
            content: "Canneberge : Prévention (min. 36 mg de PAC A/jour). Exp: Aktiv Uricalm, Cysprotect.\nD-mannose : Prévention des récidives (2 g/jour). Exp: D-mannosa.\nAntalgiques/antispasmodiques : Paracétamol, phloroglucinol. Exp: Nospasm.\nÉviter les AINS : Risque d'effets plus graves.\nPlantes antiseptiques : Bruyère, busserole. Exp: Cystinat.\nTisanes diurétiques : Orthosiphon, cassis.\nProbiotiques : Lactobacillus (L. rhamnosus, L. reuteri). Exp: Feminabiane CBU.", type: "section"
        },
        {
            title: "Médicaments prescrits et précautions",
            content: "Fosfomycine-trométamol : Ttt de 1ère intention en prise unique.\n\nAttention aux Fluoroquinolones !\nUtilisation réservée car risque d'effets indésirables graves (tendinites, etc.) et de développement de résistances bactériennes.", type: "section"
        },
        {
            title: "Recommandations alimentaires et hygiène",
            content: "Alimentation :\nBoire au moins 1,5L d'eau par jour.\nAlimentation riche en fibres (prévenir la constipation).\n\nHygiène :\nSavon gynécologique adapté.\nToilette d'avant en arrière.\nUriner après les rapports sexuels.\nSous-vêtements en coton, éviter les vêtements serrés.\nNe pas se retenir d'uriner.", type: "section"
        },
        {
            title: "Références bibliographiques",
            content: "Société de Pathologie Infectieuse de Langue Française (SPILF). Recommandations sur la prise en charge des infections urinaires (2020).\nEuropean Association of Urology (EAU) Guidelines on Urological Infections (2023).\nHaute Autorité de Santé (HAS). Fiche de bon usage des antibiotiques : cystites aiguës non compliquées (2021).\nRecommandations de l'AFSSAPS sur l'utilisation des produits à base de canneberge (2012).\nNICE guideline: Urinary tract infection (lower): antimicrobial prescribing (2018).", type: "section"
        }
    ],
    flashcardsData: [
        { question: "Quelle est la principale bactérie responsable de la cystite ?", answer: "Escherichia coli (dans 70-95% des cas)." },
        { question: "Quelle dose de Proanthocyanidines (PAC) de canneberge est recommandée par jour en prévention ?", answer: "Un minimum de 36 mg de PAC de type A." },
        { question: "Quel est l'antibiotique de première intention prescrit en prise unique pour une cystite simple ?", answer: "Fosfomycine-trométamol." },
        { question: "Quel geste d'hygiène est crucial après un rapport sexuel pour prévenir une cystite ?", answer: "Uriner pour éliminer les bactéries potentiellement introduites." },
        { question: "Pourquoi faut-il systématiquement orienter un homme avec une cystite vers un médecin ?", answer: "À cause du risque de complications, notamment une infection de la prostate." },
        { question: "Pourquoi éviter les AINS en cas de cystite ?", answer: "Risque d'effets plus graves, notamment rénaux." },
        { question: "Quel type d'alimentation peut aider à prévenir la constipation et la cystite ?", answer: "Alimentation riche en fibres." }
    ],
    quizQuestionsData: [
        { 
            question: "Quel symptôme, s'il est présent avec des brûlures mictionnelles, doit immédiatement faire orienter vers un médecin ?",
            options: ["Urines troubles", "Douleurs lombaires", "Envies fréquentes d'uriner", "Sensation de poids dans le bas-ventre"],
            answer: 1,
            explanation: "Des douleurs lombaires associées à des signes de cystite peuvent indiquer une pyélonéphrite, une infection rénale plus grave qui nécessite une consultation médicale immédiate."
        },
        { 
            question: "Quelle molécule est utilisée en prévention des récidives en agissant comme un inhibiteur compétitif de l'adhérence de E. coli ?",
            options: ["Paracétamol", "Phloroglucinol", "D-mannose", "Fosfomycine"],
            answer: 2,
            explanation: "Le D-mannose empêche Escherichia coli de s'attacher aux parois de la vessie. Il est recommandé à une dose de 2g par jour en prévention."
        },
        { question: "Quelle est la quantité minimale d'eau recommandée par jour pour une bonne hydratation en cas de cystite ?", options: ["0.5L", "1L", "1.5L", "2L"], answer: 2, explanation: "Boire au moins 1.5L d'eau par jour aide à éliminer les bactéries et à prévenir les cystites." },
        { question: "Quel est le pourcentage d'Escherichia coli responsable des cystites ?", options: ["10-20%", "30-50%", "70-95%", "99%"], answer: 2, explanation: "Escherichia coli est responsable de 70-95% des cas de cystites." },
        { question: "Quels sont les symptômes classiques de la cystite non compliquée ?", options: ["Fièvre, frissons, douleurs lombaires", "Brûlures mictionnelles, impériosité, pollakiurie", "Vomissements et diarrhées", "Douleurs articulaires"], answer: 1, explanation: "Les symptômes classiques de la cystite sont les brûlures en urinant (dysurie), le besoin pressant d'uriner (impériosité mictionnelle) et l'émission fréquente de petites quantités d'urine (pollakiurie)." },
        { question: "Lequel de ces facteurs n'est PAS une raison de la plus grande fréquence de cystites chez la femme ?", options: ["Urètre féminin plus court", "Proximité du méat urinaire avec l'anus", "Utilisation de spermicides", "Consommation excessive de café"], answer: 3, explanation: "La consommation excessive de café n'est pas une raison directe de la plus grande fréquence de cystites chez la femme, contrairement aux autres facteurs anatomiques et comportementaux." },
        { question: "Quel est le nom de l'inflammation du rein qui peut être une complication de la cystite ?", options: ["Néphrite", "Glomérulonéphrite", "Pyélonéphrite", "Urétérite"], answer: 2, explanation: "La pyélonéphrite est une infection rénale grave qui peut survenir si la cystite n'est pas traitée." },
        { question: "Quelle recommandation d'hygiène est primordiale après un rapport sexuel pour prévenir la cystite ?", options: ["Prendre une douche vaginale", "Uriner après le rapport", "Utiliser un gel intime antibactérien", "Ne rien faire de particulier"], answer: 1, explanation: "Uriner après un rapport sexuel aide à éliminer les bactéries qui auraient pu être introduites dans l'urètre." },
        { question: "Les probiotiques contenant quels lactobacillus sont spécifiquement recommandés pour la santé vaginale et urinaire ?", options: ["L. acidophilus, L. casei", "L. rhamnosus, L. reuteri", "L. bulgaricus, L. thermophilus", "L. plantarum, L. fermentum"], answer: 1, explanation: "Les souches Lactobacillus rhamnosus et Lactobacillus reuteri sont les plus étudiées et recommandées pour leur effet protecteur contre les infections urinaires et vaginales." },
        { question: "Quel est l'effet indésirable grave connu des fluoroquinolones, justifiant leur utilisation réservée ?", options: ["Problèmes digestifs", "Éruptions cutanéess", "Tendinites", "Hypertension"], answer: 2, explanation: "Les fluoroquinolones peuvent entraîner des tendinites, voire des ruptures de tendons, et sont donc réservées aux situations où d'autres antibiotiques ne sont pas appropriés." }
    ],
    glossaryTerms: ["Cystite", "Escherichia coli", "Pollakiurie", "Hématurie", "Pyélonéphrite", "Proanthocyanidines", "D-mannose", "Fosfomycine", "Antispasmodique", "Canneberge"],
    kahootLink: "https://kahoot.it/challenge/008067559?challenge-id=ce72474c-f579-45bb-9168-e288af0db70d_1704898709157",
    youtubeVideos: [],
    podcastLink: ""
  },
  'dysmenorrhees': {
    title: "Dysménorrhées",
    image: "https://picsum.photos/seed/dysmenorrhees/600/400",
    memoData: [
      { title: "Cas comptoir", content: "Une jeune femme âgée de 24 ans se présente au comptoir: « Puis-je avoir une boite d’Antafen? »", type: "section" },
      { title: "Questions à poser", content: "Depuis quand souffrez-vous de ces douleurs ?\nQuelle est l'intensité de vos douleurs (légère, modérée, intense) ?\nCes douleurs sont-elles habituelles ou plus fortes que d'habitude ?\nCes douleurs perturbent-elles vos activités quotidiennes ?\nOù précisément ressentez-vous la douleur ? Irradie-t-elle vers le dos ou les cuisses ?\nQue prenez-vous pour les soulager ? Est-ce efficace ?\nAvez-vous des règles abondantes?\nAvez-vous d'autres symptômes associés (nausées, vomissements, diarrhée, fatigue, vertige) ?\nÊtes-vous suivi régulièrement par un gynécologue ?\nAvez-vous des antécédents médicaux particuliers (ulcères gastriques ou duodénaux, insuffisance hépatique ou rénale sévère, asthme, sensibilité aux AINS) ?", type: "section" },
      { title: "Informations sur la maladie ou les symptômes", content: "La dysménorrhée, ou règles douloureuses, se manifeste par des douleurs abdominales, généralement dans le bas du ventre, souvent décrites comme des crampes. Ces douleurs surviennent juste avant ou pendant les menstruations, ou les deux.\nOn distingue la dysménorrhée primaire, qui apparaît en l'absence de maladie pelvienne identifiable. Elle est due à des fluctuations hormonales : la chute du taux de progestérone provoque une hypersécrétion de prostaglandines par l'endomètre, responsables des contractions douloureuses.\nLa douleur est souvent maximale au début des règles et dure généralement 24 à 36 heures, rarement plus. Elle peut irradier vers le bas du dos et le haut des cuisses. Des symptômes associés tels que des nausées, des vomissements, des maux de tête, de la fatigue, de l'irritabilité ou des vertiges sont fréquents.\nLa dysménorrhée secondaire, quant à elle, est causée par une pathologie pelvienne sous-jacente comme :\n- Endométriose: maladie chronique caractérisée par la présence de tissu endométrial en dehors de l'utérus.\n- Fibromes: tumeurs bénignes qui se développent dans l'utérus\n- Syndrome des ovaires polykystiques: maladie endocrinienne féminine caractérisée par une augmentation de la production d'androgènes par les ovaires, notamment de testostérone\nApparaît plus fréquemment vers la trentaine. La douleur peut être différente, apparaître jusqu'à une semaine avant les règles et persister plus longtemps.", type: "section" },
      { title: "Quand orienter vers le médecin ?", content: "Douleurs intenses ou persistantes malgré un traitement symptomatique (Suspicion d'endométriose)\nSaignements anormalement abondants ou présence de caillots\nSaignements en dehors des menstruations\nDouleurs s'intensifiant cycle après cycle\nSi la douleur n'est pas améliorée après deux cycles de traitement.\nSi les douleurs s'accompagnent de fièvre", type: "section" },
      { title: "Conseils spécifiques liés aux traitements", content: "Analgésiques:\nParacétamol : 500 mg à 1 gramme par prise trois fois par jour, à renouveler au bout de 4 heures minimum, sans dépasser 4 gr par jour.\nAnti-inflammatoires non stéroïdiens (AINS) :\nIls inhibent la synthèse des prostaglandines responsables des contractions utérines douloureuses.\nIl est conseillé de les prendre dès le premier jour des règles ou dès le début des douleurs\nIl convient de conseiller la dose la plus faible possible pendant la durée de traitement la plus courte possible (maximum cinq jours)\nLa prise doit se faire de préférence au cours des repas pour limiter les troubles gastro-intestinaux\nIbuprofène : 200 mg par prise, à renouveler toutes les 6 heures sans dépasser 1200 mg par jour.\nMédicaments antispasmodiques pour soulager les crampes du bas-ventre, à prendre tant que les douleurs persistent. Le phloroglucinol est un antispasmodique musculotrope d’action directe. Il peut être utilisé seul ou en association avec un antalgique. La posologie recommandée est de 160 mg par prise, si besoin trois fois par jour, en espaçant les administrations d'au moins deux heures.\nDes formes galéniques à action rapide peuvent être privilégiées : comprimés effervescents ou lyoc", type: "section" },
      { title: "Conseils de micronutrition et de phytothérapie", content: "Magnésium\nAide à la relaxation musculaire, pouvant réduire les crampes\nPrévient l’apparition des signes prémenstruels tel l’anxiété\nParticipe à la régulation de l'humeur\nPosologie : 300 à 400 mg par jour, en cure de 1 à 3 mois, à débuter 7 à 10 jours avant les règles\nQuel magnésium conseillez-vous?\n—Les sels organiques sont mieux assimilés et mieux tolérés par l'organisme (citrate de magnésium, malate de magnésium…).\n—Les complexes organiques solubles tels que le bisglycinate et le glycinate haute absorption\n—Les sels inorganiques sont généralement moins bien assimilés par l’organisme (chlorure de magnésium, hydroxyde de magnésium…).\nVITAMINE B6\nLa vitamine B6 peut aider à réduire les symptômes émotionnels du syndrome prémenstruel.\nAugmente l’absorption du magnésium\n1.5-2mg/jour\nGattilier\nGattilier (Vitex agnus-castus)\nCette plante peut aider à réguler le cycle menstruel et à réduire les symptômes du syndrome prémenstruel\nRecommandé du 8 au 21 jour du cycle menstruel\npendant une durée de 3 cycles\nExp: Bioherbs Gattilier\nLe gattilier est contre-indiqué chez\nles personnes de moins de 18 ans\nfemmes enceintes et allaitantes\nHuile d'Onagre\nHuile d'onagre : Riche en acides gras essentiels, elle peut aider à réduire l'inflammation.\nElle est généralement conseillée pendant les dix derniers jours du cycle,\nà renouveler pendant trois mois\nExp: 3chênes Onagre Bourrache\nPassiflore ou Mélisse :\nCes plantes pourront être proposées pour leurs propriétés antispasmodiques. La mélisse peut être utilisée sous forme d'extrait sec à une dose de 300 à 600 mg par jour\nGrande Camomille :\n aide à réduire l'inflammation et les spasmes musculaires.\nLa camomille allemande est également mentionnée pour ses effets sur la régulation du flux menstruel et la douleur associée.\nExp: Figalgic", type: "section" },
      { title: "Recommandations alimentaires", content: "Adopter une alimentation équilibrée.\nPrivilégier une alimentation riche en oméga-3 (saumon, thon, maquereau)\nLimiter les excitants comme la caféine, l'alcool et le tabac\nBoire suffisamment d'eau.", type: "section" },
      { title: "Conseils d’hygiène de vie", content: "Se reposer et dormir suffisamment\nPlacer un coussin chauffant ou une bouillotte sur le ventre augmente la motilité gastro-intestinale et a un effet relaxant sur l'utérus\nPrendre un bain ou une douche chaude peut également aider.\nPratiquer une activité physique légère à modérée pourrait diminuer les symptômes\nÉviter le tabac\nRéduire le stress\nÉviter les produits d'hygiène intime agressifs pendant les règles, privilégier les savons sans parfum à pH neutre.", type: "section" },
      { title: "Références bibliographiques", content: "Piussan, F., & Piussan, F. (2016, April 26). “Je voudrais calmer mes règles douloureuses.” Le Moniteur des Pharmacies. https://www.lemoniteurdespharmacies.fr/preparateurs/delivrance/je-voudrais-calmer-mes-regles-douloureuses-2\nLe Moniteur des pharmacies. (2008). « J’ai des règles douloureuses ». Le Moniteur des pharmacies. https://www.lemoniteurdespharmacies.fr/preparateurs/delivrance/jai-des-regles-douloureuses\nKarleskind, B., Mercier, B., & Veroli, P. (2013). Guide pratique des compléments alimentaires. https://www.thierrysouccar.com\nClere, N. (2010) Les dysménorrhées quel conseil à l’officine Actualités pharmaceutiques n°495. Doi:ACTPHA-04-2010-49-495-0515-3700-101019-201001418\nGuide pratique des compléments alimentaires Comment les utiliser pour prendre en charge les maladies les plus courantes... ( etc.) (z-lib.org)\nGuillou, E. (2009). Les dysménorrhées. In Actualités Pharmaceutiques: Vol. n° 484.\nLa survenue de douleurs pendant les règles | ameli.fr | Assuré\nMach, F., Marchandin, H., & Bichon, F. (2021). Les dysménorrhées, des troubles qui altèrent la qualité de vie. Actualités Pharmaceutiques, 60(604), 42–45. https://doi.org/10.1016/j.actpha.2021.01.013\nPrise en charge des douleurs menstruelles - Gynécologie pédiatrique | HUG - Hôpitaux Universitaires de Genève", type: "section" }
    ],
    flashcardsData: [
      { question: "Quelle est la principale cause de la dysménorrhée primaire ?", answer: "Hypersécrétion de prostaglandines par l'endomètre." },
      { question: "Quel est le principe actif d'Antafen ?", answer: "Ibuprofène." },
      { question: "Quel antalgique peut être pris jusqu'à 4g par jour ?", answer: "Paracétamol." },
      { question: "Quel type de sels de Magnésium est mieux assimilé ?", answer: "Les sels organiques (citrate, malate) ou complexes organiques solubles (bisglycinate, glycinate)." },
      { question: "Quelle plante est contre-indiquée chez les femmes enceintes et allaitantes pour les dysménorrhées ?", answer: "Gattilier." },
      { question: "Combien de temps avant les règles doit-on commencer une cure de Magnésium ?", answer: "7 à 10 jours avant les règles." },
      { question: "Quel conseil d'hygiène de vie peut soulager les crampes utérines ?", answer: "Placer une bouillotte sur le bas-ventre." }
    ],
    quizQuestionsData: [
      { question: "La dysménorrhée primaire est causée par :", options: ["L'endométriose", "Une hypersécrétion de prostaglandines", "Des fibromes utérins", "Le syndrome des ovaires polykystiques"], answer: 1, explanation: "La dysménorrhée primaire est due à l'hypersécrétion de prostaglandines par l'endomètre." },
      { question: "Quel est le symptôme le plus fréquent de la dysménorrhée ?", options: ["Fièvre", "Douleurs abdominales type crampes", "Saignements en dehors des règles", "Douleurs aux épaules"], answer: 1, explanation: "Les douleurs abdominales, souvent décrites comme des crampes, sont le symptôme principal." },
      { question: "Quelle est la dose maximale d'Ibuprofène par jour conseillée pour les dysménorrhées ?", options: ["600 mg", "800 mg", "1200 mg", "2400 mg"], answer: 2, explanation: "La dose maximale d'Ibuprofène est de 1200 mg par jour." },
      { question: "Dans quel cas doit-on orienter une patiente vers un médecin ?", options: ["Douleurs légères et habituelles", "Douleurs intenses ou persistantes malgré traitement", "Prise de Paracétamol", "Règles non abondantes"], answer: 1, explanation: "Des douleurs intenses ou persistantes malgré un traitement symptomatique sont un signe d'orientation médicale." },
      { question: "Quel minéral aide à la relaxation musculaire et réduit les crampes menstruelles ?", options: ["Calcium", "Fer", "Magnésium", "Zinc"], answer: 2, explanation: "Le Magnésium contribue à la relaxation musculaire et peut réduire les crampes." },
      { question: "L'huile d'Onagre est riche en acides gras essentiels et peut aider à réduire :", options: ["La fièvre", "L'inflammation", "La fatigue", "La soif"], answer: 1, explanation: "L'huile d'Onagre est reconnue pour ses propriétés anti-inflammatoires." },
      { question: "Quel est le principal facteur d'aggravation des douleurs de dysménorrhée selon l'hygiène de vie ?", options: ["Boire de l'eau", "Faire de l'activité physique", "Réduire le stress", "Le tabac"], answer: 3, explanation: "Le tabac, comme d'autres excitants, peut aggraver les symptômes." },
      { question: "La Mélisse et la Passiflore sont proposées pour leurs propriétés :", options: ["Stimulantes", "Antispasmodiques", "Anti-infectieuses", "Diurétiques"], answer: 1, explanation: "Ces plantes sont connues pour leurs propriétés antispasmodiques, aidant à calmer les crampes." },
      { question: "Quelle est la posologie recommandée pour le Paracétamol dans les dysménorrhées ?", options: ["250 mg 2 fois/jour", "500 mg à 1g toutes les 4h, max 4g/jour", "1g 1 fois/jour", "2g 3 fois/jour"], answer: 1, explanation: "Le Paracétamol peut être pris de 500 mg à 1g toutes les 4 heures, sans dépasser 4g par jour." },
      { question: "La dysménorrhée secondaire peut être causée par :", options: ["Une carence en Vitamine C", "Un déséquilibre alimentaire", "L'endométriose", "Un manque de sommeil"], answer: 2, explanation: "L'endométriose est une cause organique majeure de dysménorrhée secondaire." }
    ],
    glossaryTerms: [
      "Dysménorrhée", "Prostaglandines", "Endométriose", "Fibromes utérins", "Syndrome des ovaires polykystiques",
      "Analgésiques", "Anti-inflammatoires Non Stéroïdiens (AINS)", "Antispasmodiques", "Paracétamol", "Ibuprofène",
      "Phloroglucinol", "Magnésium", "Vitamine B6", "Gattilier", "Huile d'Onagre", "Passiflore", "Mélisse",
      "Grande Camomille", "oméga-3", "Progestérone", "Endomètre", "Hypersécrétion"
    ],
    kahootLink: "https://kahoot.it/challenge/005572480?challenge-id=ce72474c-f579-45bb-9168-e288af0db70d_1723785229353",
    youtubeVideos: [],
    podcastLink: ""
  },
  'contraception': {
    title: "Contraception Orale",
    image: "https://picsum.photos/seed/contraception/600/400",
    memoData: [
      { title: "Introduction", content: "Le rôle du pharmacien d'officine (et par extension du préparateur en pharmacie) est essentiel pour informer et expliquer les différents moyens contraceptifs afin de prévenir les grossesses non désirées. La connaissance de la physiologie de la reproduction est fondamentale pour bien conseiller les patientes.", type: "text" },
      {
        title: "LA CONTRACEPTION ORALE RÉGULIÈRE",
        content: "La contraception hormonale repose sur l'administration d'hormones œstrogéniques et/ou progestatives. Son efficacité peut atteindre 99,7 % si elle est prise régulièrement.",
        type: "section",
        children: [
          {
            title: "Pilules Œstroprogestatives (OP) / Combinées",
            content: "Composition : Contiennent des œstrogènes et des progestatifs.\nMécanisme d'action principal :\n◦ Blocage de l'ovulation par rétrocontrôle négatif sur l'axe hypothalamo-hypophysaire.\n◦ Épaississement de la glaire cervicale, rendant difficile le passage des spermatozoïdes.\n◦ Modification de l'endomètre (muqueuse utérine) pour empêcher la nidation.\nPrise :\n◦ Généralement prise pendant 21 jours consécutifs, suivis de 7 jours sans pilule ou avec des pilules placebo (pour les plaquettes de 28 jours).\n◦ Début : Le premier comprimé est idéalement pris le premier jour des règles pour une protection immédiate.\n◦ Si le début est après le premier jour des règles, une méthode contraceptive supplémentaire (ex: préservatifs) est conseillée pendant les 7 premiers jours.\n◦ La prise doit se faire à heure fixe chaque jour.\nAvantages : Diminution des crampes et saignements menstruels, régularisation du cycle, diminution du risque de certains cancers (ovaires, endomètre), peut réduire l'acné.\nContre-indications principales :\n◦ Tabagisme (> 35 ans).\n◦ Antécédents thromboemboliques.\n◦ Hypertension artérielle non contrôlée.\n◦ Diabète avec complications vasculaires.\n◦ Migraines avec aura.\nEffets indésirables possibles (souvent temporaires 1-3 mois) : Douleurs mammaires, troubles du cycle, nausées/vomissements, céphalées, modifications de l'humeur, changements de la libido, acné, variations de poids.", type: "section"
          },
          {
            title: "Pilules Progestatives Seules (Minipilules)",
            content: "Composition : Contiennent uniquement un progestatif (sans œstrogène).\nMécanisme d'action :\n◦ Ceux à base de lévonorgestrel agissent principalement en épaississant la glaire cervicale et ont une action anti-gonadotrope partielle.\n◦ Ceux à base de désogestrel ont un effet anti-gonadotrope plus marqué, supprimant l'ovulation dans la plupart des cas.\nPrise : La prise est quotidienne et continue (plaquettes de 28 comprimés) sans interruption, toujours à la même heure.\nParticularité : Recommandées pour les femmes allaitantes, car elles n'affectent pas la production de lait maternel et passent en très petites quantités dans le lait.\nTolérance à l'oubli : Faible pour celles à base de lévonorgestrel (environ 3 heures) ; plus longue pour celles à base de désogestrel.", type: "section"
          }
        ]
      },
      {
        title: "QUESTIONS FRÉQUENTES À L'OFFICINE",
        content: "",
        type: "section",
        children: [
          { title: "1. Quand dois-je commencer ma plaquette ?", content: "Le premier jour des règles est recommandé pour une efficacité immédiate.\nSi la prise est débutée après le premier jour des règles, conseiller une méthode contraceptive complémentaire (ex: préservatif) pendant les 7 premiers jours.\nNe pas dépasser les 5 premiers jours du cycle pour une synchronisation optimale.\nLa prise doit être effectuée à heure fixe chaque jour.", type: "section" },
          { title: "2. J'ai eu un rapport non protégé, que dois-je faire ?", content: "Conseiller la contraception d'urgence (CU) le plus rapidement possible.\nEn Tunisie, EllaOne® (Acétate d'ulipristal 30 mg) est disponible.\n- Délai d'action : Efficace jusqu'à 5 jours (120 heures) après le rapport sexuel non protégé.\n- Efficacité : 95 % si prise dans les 24 premières heures, diminue progressivement avec le temps.\n- Mode d'action : Inhibe ou retarde l'ovulation, et peut aussi agir sur l'endomètre pour empêcher la nidation.\n- Prise : Un seul comprimé suffit.\n- Vomissements : Si la patiente vomit dans les 3 heures suivant la prise, elle doit reprendre un nouveau comprimé.\nPoints importants à rappeler :\n- La CU n'est pas une méthode contraceptive régulière et ne doit être utilisée qu'en cas d'urgence.\n- Elle ne protège pas contre les infections sexuellement transmissibles (IST), y compris le VIH.\n- Conseiller l'utilisation d'une méthode contraceptive locale (ex: préservatifs) pour les rapports suivants jusqu'aux prochaines règles.\n- Si les règles ont un retard de plus de 5 jours ou si les saignements sont anormaux, conseiller un test de grossesse (urinaire 3 semaines après le RNP, ou sanguin 10 jours après).\n- Allaitement : Déconseiller l'allaitement pendant au moins 36 heures après la prise d'EllaOne®.", type: "section" },
          { title: "3. Je ne veux pas avoir mes règles pendant mes vacances, est-ce possible ?", content: "Pilule 21 jours : Enchaîner directement la nouvelle plaquette sans la pause de 7 jours.\nPilule 28 jours (avec comprimés placebo) : Sauter les comprimés placebo et commencer directement la nouvelle plaquette.\nMinipilule : Plus complexe, nécessite une consultation médicale pour une prescription de comprimés supplémentaires (noréthistérone) ou un changement temporaire de pilule.", type: "section" },
          { title: "4. Dois-je reprendre ma contraception même si mes règles ne sont pas terminées ?", content: "Oui, il faut reprendre le comprimé le jour prévu, même si les saignements se poursuivent, afin de maintenir l'effet contraceptif.", type: "section" },
          { title: "5. Que faire en cas de vomissements après la prise de ma pilule ?", content: "Si vomissements surviennent moins de 4 heures après la prise : Reprendre un comprimé immédiatement (if possible dans les 12h de l'heure habituelle pour OP, ou 3h pour microprogestative). Continuer la plaquette normalement.\nSi vomissements à répétition ou si rapport non protégé dans les 5 jours précédant l'oubli : Envisager la contraception d'urgence (EllaOne®).\nIf vomissements surviennent plus de 4 heures après la prise : L'efficacité n'est généralement pas compromise, les hormones ont eu le temps d'être absorbées.", type: "section" },
          { title: "6. Vais-je grossir avec la pilule ?", content: "La contraception hormonale peut être associée à une prise de poids modérée (environ 2 kg) chez certaines femmes, mais ce n'est pas systématique.", type: "section" },
          { title: "7. Quels sont les signes qui doivent m'alerter ?", content: "Signes de phlébite : Gonflement douloureux de la jambe, douleur aiguë au mollet ou à la cuisse.\nSignes d'embolie pulmonaire : Essoufflement brutal, douleur thoracique.\nMigraines inhabituelles ou sévères.\nTroubles de la vision (vue embrouillée ou perte de vision).\nDouleurs abdominales aiguës.\nDifficulté à s'exprimer ou engourdissements.", type: "section" },
          { title: "8. J'ai oublié de prendre ma pilule.", content: "Pilules Œstroprogestatives ou Microprogestatives à base de désogestrel :\n- Oubli de moins de 12 heures : Prendre le comprimé oublié immédiatement. Continuer la plaquette normalement. L'efficacité est maintenue.\n- Oubli de plus de 12 heures : Prendre le comprimé oublié dès que possible (même si cela fait 2 comprimés le même jour). Utiliser une méthode contraceptive supplémentaire (préservatif) pendant les 7 jours suivants.\n- Oubli dans la dernière semaine de comprimés actifs (pilules OP 21 ou 28 jours) : Ne pas faire la pause de 7 jours (ou sauter les placebos) et commencer la plaquette suivante directement.\nPilules Microprogestatives à base de lévonorgestrel :\n- Délai de tolérance très faible : 3 heures.\n- Oubli de moins de 3 heures : Prendre le comprimé oublié immédiatement. Continuer la plaquette normalement. Efficacité maintenue.\n- Oubli de plus de 3 heures : Prendre le comprimé oublié dès que possible. Utiliser une méthode contraceptive supplémentaire (préservatif) pendant les 7 jours suivants.\nRègle de précaution commune : Si un rapport sexuel a lieu dans les 5 jours précédant l'oubli ou si l'oubli concerne au moins 2 comprimés, conseiller une contraception d'urgence (EllaOne®).\nTest de grossesse : En cas de doute ou de retard de règles, conseiller un test de grossesse 21 jours après l'oubli.", type: "section" },
          { title: "9. Est-ce que certains médicaments peuvent diminuer l'efficacité de ma pilule contraceptive ?", content: "Oui, plusieurs médicaments peuvent réduire l'efficacité des pilules, tels que la Rifampicine, la Carbamazépine, le Phénobarbital, et la plante millepertuis. Il est crucial de toujours informer le médecin ou le pharmacien de tout autre traitement en cours.", type: "section" }
        ]
      },
      {
        title: "CONTRACEPTION & IDÉES REÇUES (Vrai/Faux)",
        content: "", 
        type: "section",
        children: [
          { title: "Les contraceptifs d'urgence protègent du VIH et des IST.", content: "FAUX. Ils n'offrent aucune protection contre les infections sexuellement transmissibles (IST), y compris le VIH.", type: "section" },
          { title: "La pilule rend stérile.", content: "FAUX. Dès l'arrêt de la pilule, le fonctionnement hormonal revient à la normale, et la fertilité est généralement retrouvée.", type: "section" },
          { title: "La pilule fait grossir.", content: "FAUX. La pilule en elle-même ne fait pas prendre de poids systématiquement, mais peut ouvrir l'appétit chez certaines personnes. Une prise de poids modérée (environ 2 kg) peut être observée.", type: "section" },
          { title: "Le tabac est contre-indiqué avec la prise de la pilule.", content: "À DISCUTER AVEC LE MÉDECIN. Il s'agit d'une précaution d'emploi importante. Les pilules à base d'œstrogènes, surtout, augmentent les risques cardiovasculaires avec le tabac, surtout après 35 ans.", type: "section" },
          { title: "Il n’y a pas de risque de grossesse puisque j’ai encore mes règles.", content: "FAUX. Une grossesse est possible à n’importe quel moment du cycle, car une ovulation peut se déclencher très tôt, même pendant les règles.", type: "section" },
          { title: "Il n’y a aucun risque de tomber enceinte avant les premières règles.", content: "FAUX. Il y a un risque si un rapport a eu lieu dans le mois précédant l’arrivée des premières règles, car la première ovulation précède leur arrivée.", type: "section" }
        ]
      },
      { title: "Références bibliographiques", content: "Les sources ont été citées directement dans le document original, en fin de phrase, sous forme de numéro de référence. Ces références ne sont pas disponibles ici, mais incluent des revues scientifiques, des publications de l'OMS, et des recommandations de sociétés savantes de gynécologie et de pharmacologie.", type: "section" }
    ],
    flashcardsData: [
      { question: "Quel est le mécanisme d'action principal des pilules œstroprogestatives ?", answer: "Blocage de l'ovulation, épaississement de la glaire cervicale, modification de l'endomètre." },
      { question: "Quelle pilule est recommandée pour les femmes allaitantes ?", answer: "Les pilules progestatives seules (minipilules)." },
      { question: "Quel est le délai maximal pour prendre EllaOne® après un rapport non protégé ?", answer: "5 jours (120 heures)." },
      { question: "Si une patiente vomit 2 heures après avoir pris sa pilule d'urgence, que doit-elle faire ?", answer: "Reprendre un nouveau comprimé immédiatement." },
      { question: "La contraception d'urgence protège-t-elle des IST ?", answer: "FAUX. Elle n'offre aucune protection." },
      { question: "Que faire en cas d'oubli de pilule OP de moins de 12 heures ?", answer: "Prendre le comprimé oublié immédiatement et continuer normalement." },
      { question: "La pilule fait-elle systématiquement grossir ?", answer: "FAUX. Une prise de poids modérée (environ 2 kg) peut être observée, mais ce n'est pas systématique." }
    ],
    quizQuestionsData: [
      { question: "Quelle est l'efficacité théorique de la contraception orale si elle est prise régulièrement ?", options: ["50%", "75%", "90%", "99,7%"], answer: 3, explanation: "L'efficacité de la contraception orale peut atteindre 99,7% avec une prise régulière." },
      { question: "Quel est le principal mécanisme d'action des pilules œstroprogestatives ?", options: ["Augmentation de la production de lait", "Blocage de l'ovulation", "Fluidification de la glaire cervicale", "Dilatation de l'utérus"], answer: 1, explanation: "Le mécanisme d'action principal des pilules œstroprogestatives est le blocage de l'ovulation." },
      { question: "Parmi ces options, laquelle n'est PAS une contre-indication majeure aux pilules œstroprogestatives ?", options: ["Tabagisme (> 35 ans)", "Antécédents thromboemboliques", "Rhume commun", "Diabète avec complications vasculaires"], answer: 2, explanation: "Le rhume commun n'est pas une contre-indication majeure aux pilules œstroprogestatives." },
      { question: "Combien de temps faut-il utiliser une méthode contraceptive supplémentaire après un début de pilule OP si elle n'est pas prise le 1er jour des règles ?", options: ["1 jour", "3 jours", "7 jours", "14 jours"], answer: 2, explanation: "Une méthode contraceptive supplémentaire est conseillée pendant les 7 premiers jours." },
      { question: "Quel est le délai de tolérance pour l'oubli d'une pilule microprogestative à base de lévonorgestrel ?", options: ["1 heure", "3 heures", "12 heures", "24 heures"], answer: 1, explanation: "Le délai de tolérance pour l'oubli d'une pilule microprogestative à base de lévonorgestrel est très faible, environ 3 heures." },
      { question: "Si une patiente a un rapport non protégé, quel est le délai maximal pour que l'EllaOne® soit efficace ?", options: ["24 heures", "48 heures", "72 heures", "120 heures"], answer: 3, explanation: "EllaOne® est efficace jusqu'à 5 jours (120 heures) après le rapport sexuel non protégé." },
      { question: "Quel conseil doit-on donner concernant l'allaitement après la prise d'EllaOne® ?", options: ["Allaiter normalement", "Déconseiller l'allaitement pendant 36 heures", "Allaiter toutes les 2 heures", "Seulement si le bébé a plus de 6 mois"], answer: 1, explanation: "Il est déconseillé d'allaiter pendant au moins 36 heures après la prise d'EllaOne®." },
      { question: "Comment une femme sous pilule 21 jours peut-elle décaler ses règles pour les vacances ?", options: ["Prendre 2 comprimés le même jour", "Arrêter la pilule pendant 7 jours de plus", "Enchaîner directement la nouvelle plaquette sans pause", "Ne rien faire, ce n'est pas possible"], answer: 2, explanation: "Pour décaler les règles, une femme sous pilule 21 jours peut enchaîner directement la nouvelle plaquette sans la pause de 7 jours." },
      { question: "Quel signe nécessite une consultation médicale urgente lors de la prise de pilule ?", options: ["Maux de tête légers", "Gonflement douloureux de la jambe", "Petits saignements entre les règles (spotting)", "Prise de poids de 1kg"], answer: 1, explanation: "Un gonflement douloureux de la jambe est un signe potentiel de phlébite et nécessite une consultation médicale urgente." },
      { question: "Quel est le principal mythe concernant la pilule démoli dans le document ?", options: ["Elle protège des IST", "Elle rend stérile", "Elle ne fait pas grossir", "Elle est toujours contre-indiquée avec le tabac"], answer: 1, explanation: "Le mythe que la pilule rend stérile est démoli, la fertilité étant généralement retrouvée après l'arrêt." }
    ],
    glossaryTerms: [
      "Contraception hormonale", "Œstroprogestatives", "Progestatives", "Ovulation", "Rétrocontrôle négatif",
      "Hypothalamo-hypophysaire", "Glaire cervicale", "Endomètre", "Nidation", "Placebo", "Thromboemboliques",
      "Hypertension artérielle", "Migraines avec aura", "Lévonorgestrel", "Désogestrel", "Anti-gonadotrope",
      "Contraception d'urgence (CU)", "EllaOne®", "Acétate d'ulipristal", "Infections Sexuellement Transmissibles (IST)",
      "VIH", "Noréthistérone", "Phlébite", "Embolie pulmonaire", "Carbamazépine", "Phénobarbital", "Millepertuis",
      "Fertilité", "Aménorrhée", "Spotting", "Libido"
    ],
    kahootLink: "https://kahoot.it/challenge/007230153?challenge-id=ce72474c-f579-45bb-9168-e288af0db70d_1746983553719",
    youtubeVideos: [
      { title: "La Contraception", url: "https://www.youtube.com/embed/yzwYjTFsWHc" },
      { title: "La Contraception d'urgence", url: "https://www.youtube.com/embed/2HrYkE_qPyo" }
    ],
    podcastLink: ""
  }
};
