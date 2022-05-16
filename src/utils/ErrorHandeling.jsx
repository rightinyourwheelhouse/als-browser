const ErrorHandling = (error) => {
	switch (error.code) {
		case 'auth/email-already-in-use':
			return 'Dit e-mailadres is al in gebruik.';
		case 'auth/invalid-email':
			return 'Dit emailadres is niet geldig.';
		case 'auth/weak-password':
			return 'Het wachtwoord moet minimaal 6 tekens zijn.';
		case 'auth/user-not-found':
			return 'Dit emailadres is niet geregistreerd.';
		case 'auth/wrong-password':
			return 'Wachtwoord is incorrect.';
		default:
			return 'Er is een fout opgetreden.';
	}
};

export default ErrorHandling;
