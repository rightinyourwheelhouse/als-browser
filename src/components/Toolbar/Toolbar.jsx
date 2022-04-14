import React, { useState } from 'react';
import styles from './toolbar.module.css';

const Toolbar = () => {
	const [input, setInput] = useState('');

	// Can we put this in one function?
	const handleGoBack = () => {
		window.api.send('goBack');
	};

	const handleGoForward = () => {
		window.api.send('goForward');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		window.api.send('toMain', input);
	};

	const handleRefresh = () => {
		window.api.send('refresh');
	};

	const handleClose = () => {
		window.api.send('close');
	};

	const handleMinimize = () => {
		window.api.send('minimize');
	};

	const handleDashboard = () => {
		window.api.send('dashboard');
	};

	const handleAdjustSize = () => {
		window.api.send("adjustSize")
	}

	return (
		<>
			<div className={styles.toolbar_wrapper}>
				<div className={styles.toolbar}>
					<div className={styles.toolbar_icon_wrapper}>
						<div onClick={handleGoBack} className={styles.toolbar_icon}>
							<svg width="18" height="32" viewBox="0 0 18 32" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M7.01684 14.2709C6.09118 15.2377 6.09118 16.762 7.01684 17.7288L16.7182 27.8611C17.4351 28.6099 17.4351 29.7905 16.7182 30.5392C15.9558 31.3354 14.6835 31.3354 13.9211 30.5392L1.65564 17.7288C0.729984 16.762 0.729984 15.2377 1.65564 14.2709L13.9211 1.46054C14.6835 0.66431 15.9558 0.664309 16.7182 1.46054C17.4351 2.20929 17.4351 3.38985 16.7182 4.13861L7.01684 14.2709Z"
									fill="#343A44"
								/>
							</svg>
						</div>

						<div onClick={handleGoForward} className={styles.toolbar_icon}>
							<svg width="17" height="32" viewBox="0 0 17 32" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M10.5029 17.7289C11.4286 16.7622 11.4286 15.2378 10.5029 14.2711L0.801607 4.13873C0.0847013 3.38997 0.0847013 2.20941 0.801607 1.46066C1.56396 0.664432 2.8363 0.664433 3.59866 1.46066L15.8641 14.2711C16.7898 15.2378 16.7898 16.7622 15.8641 17.7289L3.59866 30.5393C2.8363 31.3356 1.56396 31.3356 0.801607 30.5393C0.0847014 29.7906 0.0847016 28.61 0.801607 27.8613L10.5029 17.7289Z"
									fill="#343A44"
								/>
							</svg>
						</div>
					</div>

					<div className={styles.toolbar_searchinput_wrapper}>
						<div onClick={handleRefresh} className={styles.toolbar_icon}>
							<svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M6.33766 25.8238C3.4466 21.9117 3.05137 18.0724 3.86539 14.8073C4.68048 11.5379 6.70963 8.83899 8.67335 7.22077L8.67342 7.22072C13.9493 2.86482 21.7856 3.58628 26.46 8.39801L22.0621 8.29684L22.0614 8.29683C21.3181 8.28495 20.6056 8.86431 20.606 9.68682C20.5946 10.4297 21.1737 11.1417 21.9959 11.1414C21.9962 11.1414 21.9965 11.1414 21.9968 11.1414L30.207 11.2858L30.207 11.2863L30.2174 11.2854C30.9303 11.2236 31.3148 10.8582 31.4952 10.4489C31.6707 10.0508 31.6518 9.61452 31.57 9.39207L29.0872 1.60402C28.8833 0.89506 28.2042 0.497441 27.486 0.630552C26.5868 0.797204 26.2059 1.77071 26.4173 2.53227L26.4173 2.53228L26.4182 2.53522L27.3072 5.3939C22.6958 1.62 14.798 -0.739328 6.82186 4.88297L6.8218 4.88289L6.81817 4.8857C5.11228 6.20938 2.45423 9.17678 1.20333 13.157C-0.0494577 17.1433 0.111391 22.1401 4.03989 27.5048C9.31699 34.7213 19.8046 35.7516 26.8074 30.27L26.8074 30.27L26.8093 30.2685C27.3927 29.7884 27.5308 28.9444 27.0379 28.2919L27.038 28.2918L27.0353 28.2886C26.5553 27.7052 25.7113 27.5671 25.0588 28.06L25.0588 28.06L25.0575 28.061C19.2817 32.5732 10.6874 31.7078 6.33766 25.8238ZM6.33766 25.8238L6.25724 25.8832L6.33765 25.8238C6.33765 25.8238 6.33766 25.8238 6.33766 25.8238Z"
									fill="#343A44"
									stroke="#343A44"
									strokeWidth="0.2"
								/>
							</svg>
						</div>
						<form onSubmit={handleSubmit}>
							<input
								className={styles.toolbar_searchinput}
								onInput={(e) => setInput(e.target.value)}
								placeholder="Typ een website om te zoeken"
							></input>
						</form>
						<div onClick={handleDashboard} className={styles.toolbar_icon}>
							<svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M15.2875 0.000595555C15.0251 0.00955745 14.7724 0.10221 14.5663 0.265014L2.9047 9.45234C1.42461 10.6188 0.558594 12.4012 0.558594 14.2856V29.9488C0.558594 31.0676 1.49101 32 2.60984 32H10.8148C11.9336 32 12.8661 31.0676 12.8661 29.9488V21.7438C12.8661 21.5017 13.0342 21.3335 13.2763 21.3335H17.3788C17.6209 21.3335 17.789 21.5017 17.789 21.7438V29.9488C17.789 31.0676 18.7215 32 19.8403 32H28.0453C29.1641 32 30.0965 31.0676 30.0965 29.9488V14.2856C30.0965 12.4012 29.2305 10.6188 27.7504 9.45234L16.0888 0.265014C15.8612 0.0852224 15.5774 -0.00842274 15.2875 0.000595555ZM15.3275 2.79862L26.228 11.3866C27.1175 12.0876 27.635 13.1538 27.635 14.2856V29.5385H20.2505V21.7438C20.2505 20.1726 18.95 18.872 17.3788 18.872H13.2763C11.7051 18.872 10.4046 20.1726 10.4046 21.7438V29.5385H3.02009V14.2856C3.02009 13.1538 3.53761 12.0876 4.42711 11.3866L15.3275 2.79862Z"
									fill="#343A44"
								/>
							</svg>
						</div>
					</div>

					<div className={styles.toolbar_window_commands_wrapper}>
						<div onClick={handleMinimize} className={styles.toolbar_icon}>
							<svg width="29" height="4" viewBox="0 0 29 4" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M29 2C29 3.10457 28.1046 4 27 4H2C0.89543 4 0 3.10457 0 2C0 0.895431 0.89543 0 2 0H27C28.1046 0 29 0.895431 29 2Z"
									fill="#343A44"
								/>
							</svg>
						</div>
						<div onClick={handleAdjustSize} className={styles.toolbar_icon}>
							<svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M2.67579 20.6978C2.67579 20.6978 2.67579 20.6978 2.67579 20.6978V17.7308C2.67579 17.7308 2.67579 17.7308 2.67579 17.7308C2.67577 17.3667 2.38056 17.0715 2.01645 17.0715C1.98732 17.0715 1.95863 17.0733 1.9305 17.077C1.95864 17.0733 1.98734 17.0714 2.01648 17.0714C2.38063 17.0714 2.67582 17.3666 2.67582 17.7308V20.6978C2.67582 22.7006 4.29941 24.3242 6.3022 24.3242H9.26923C9.63338 24.3242 9.92857 24.6194 9.92857 24.9835C9.92857 25.024 9.92491 25.0635 9.91794 25.102C9.9249 25.0635 9.92854 25.024 9.92854 24.9836C9.92854 24.6194 9.63334 24.3242 9.26919 24.3242H6.30216C4.42455 24.3242 2.88022 22.8972 2.69451 21.0686C2.68213 20.9467 2.67579 20.823 2.67579 20.6978ZM9.26925 23.967C9.26924 23.967 9.26924 23.967 9.26923 23.967H9.26925ZM2.0165 16.7143C2.01649 16.7143 2.01649 16.7143 2.01648 16.7143H2.0165ZM24.9496 17.0723C24.9608 17.0717 24.9722 17.0714 24.9835 17.0714C25.0157 17.0714 25.0474 17.0738 25.0783 17.0782C25.0474 17.0738 25.0157 17.0715 24.9836 17.0715C24.6194 17.0715 24.3242 17.3667 24.3242 17.7308V20.6978C24.3242 22.7006 22.7006 24.3242 20.6978 24.3242H17.7308C17.3667 24.3242 17.0715 24.6194 17.0715 24.9836C17.0715 25.0163 17.0739 25.0485 17.0785 25.08C17.0738 25.0485 17.0714 25.0163 17.0714 24.9835C17.0714 24.6194 17.3666 24.3242 17.7308 24.3242H17.7308H20.6978C22.7006 24.3242 24.3242 22.7006 24.3242 20.6978V17.7308C24.3242 17.5043 24.4384 17.3044 24.6124 17.1857C24.6176 17.1822 24.6229 17.1787 24.6282 17.1753C24.7218 17.1153 24.8316 17.0783 24.9496 17.0723ZM17.7308 3.03297C17.7308 3.03297 17.7308 3.03297 17.7308 3.03297H17.7308ZM24.9835 10.2857C24.9835 10.2857 24.9835 10.2857 24.9835 10.2857H24.9835ZM6.3022 3.53297H9.26923C10.1068 3.53297 10.7857 2.85401 10.7857 2.01648C10.7857 1.17895 10.1068 0.5 9.26923 0.5H5.64286C2.80254 0.5 0.5 2.80254 0.5 5.64286V9.26923C0.5 10.1068 1.17895 10.7857 2.01648 10.7857C2.85401 10.7857 3.53297 10.1068 3.53297 9.26923V6.3022C3.53297 4.7728 4.77279 3.53297 6.3022 3.53297ZM3.53297 20.6978V17.7308C3.53297 16.8932 2.85401 16.2143 2.01648 16.2143C1.17895 16.2143 0.5 16.8932 0.5 17.7308V21.3571C0.5 24.1975 2.80254 26.5 5.64286 26.5H9.26923C10.1068 26.5 10.7857 25.821 10.7857 24.9835C10.7857 24.146 10.1068 23.467 9.26923 23.467H6.3022C4.7728 23.467 3.53297 22.2272 3.53297 20.6978ZM20.6978 23.467H17.7308C16.8932 23.467 16.2143 24.146 16.2143 24.9835C16.2143 25.821 16.8932 26.5 17.7308 26.5H21.3571C24.1975 26.5 26.5 24.1975 26.5 21.3571V17.7308C26.5 16.8932 25.821 16.2143 24.9835 16.2143C24.146 16.2143 23.467 16.8932 23.467 17.7308V20.6978C23.467 22.2272 22.2272 23.467 20.6978 23.467ZM23.467 6.3022V9.26923C23.467 10.1068 24.146 10.7857 24.9835 10.7857C25.821 10.7857 26.5 10.1068 26.5 9.26923V5.64286C26.5 2.80254 24.1975 0.5 21.3571 0.5H17.7308C16.8932 0.5 16.2143 1.17895 16.2143 2.01648C16.2143 2.85401 16.8932 3.53297 17.7308 3.53297H20.6978C22.2272 3.53297 23.467 4.77279 23.467 6.3022ZM2.02497 9.92852C2.02214 9.92855 2.01932 9.92857 2.01648 9.92857C1.90258 9.92857 1.79542 9.89969 1.70193 9.84885C1.79541 9.89967 1.90256 9.92854 2.01645 9.92854C2.15357 9.92854 2.28093 9.88668 2.38642 9.81504C2.42098 9.79156 2.4532 9.76489 2.48265 9.73544C2.60197 9.61612 2.67578 9.45129 2.67579 9.26923C2.67579 9.26922 2.67579 9.26921 2.67579 9.26919V6.3022V6.30216C2.67579 6.29435 2.67581 6.28655 2.67586 6.27875C2.67661 6.16157 2.6829 6.04571 2.69451 5.93142C2.85546 4.34662 4.03688 3.06346 5.57132 2.74947C5.80739 2.70116 6.05181 2.67579 6.30216 2.67579H9.26919C9.63334 2.67579 9.92854 2.38059 9.92854 2.01645C9.92854 1.92182 9.90861 1.83184 9.87271 1.75049C9.90862 1.83185 9.92857 1.92184 9.92857 2.01648C9.92857 2.38063 9.63338 2.67582 9.26923 2.67582H6.3022C4.29941 2.67582 2.67582 4.29941 2.67582 6.3022V9.26923C2.67582 9.61107 2.41568 9.89215 2.08256 9.92529C2.07745 9.9258 2.07232 9.92625 2.06717 9.92665C2.05322 9.92771 2.03915 9.92834 2.02497 9.92852ZM17.184 2.38507C17.1633 2.35438 17.1451 2.32185 17.1297 2.28778C17.0923 2.20503 17.0715 2.11317 17.0715 2.01645C17.0715 1.91404 17.0948 1.81707 17.1365 1.7306C17.0948 1.81708 17.0714 1.91405 17.0714 2.01648C17.0714 2.38063 17.3666 2.67582 17.7308 2.67582H20.6978C22.7006 2.67582 24.3242 4.29941 24.3242 6.3022V9.26923C24.3242 9.63338 24.6194 9.92857 24.9835 9.92857C25.0565 9.92857 25.1266 9.91672 25.1922 9.89485C25.1266 9.91671 25.0565 9.92854 24.9836 9.92854C24.6194 9.92854 24.3242 9.63334 24.3242 9.26919V6.30216C24.3242 5.11692 23.7556 4.06449 22.8763 3.40277C22.7805 3.3307 22.681 3.26326 22.5782 3.20079C22.0798 2.89793 21.5025 2.71184 20.8844 2.68051C20.8226 2.67737 20.7604 2.67579 20.6978 2.67579C20.6978 2.67579 20.6978 2.67579 20.6978 2.67579H17.7308C17.7308 2.67579 17.7308 2.67579 17.7308 2.67579C17.5032 2.67578 17.3025 2.56046 17.184 2.38507Z"
									fill="#343A44"
								/>
							</svg>
						</div>
						<div onClick={handleClose} className={styles.toolbar_icon}>
							<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M12.1422 14.9252L20.5392 23.5697C21.2029 24.2529 22.2998 24.2529 22.9634 23.5697C23.6004 22.914 23.6004 21.8706 22.9634 21.2149L14.498 12.5L22.9634 3.78513C23.6004 3.12941 23.6004 2.08604 22.9634 1.43032C22.2998 0.747113 21.2029 0.747114 20.5392 1.43032L12.1422 10.0748L3.5679 1.24782C2.90425 0.564605 1.80736 0.564605 1.1437 1.24782C0.506753 1.90354 0.506752 2.94691 1.1437 3.60263L9.78641 12.5L1.1437 21.3974C0.506753 22.0531 0.506753 23.0965 1.14371 23.7522C1.80736 24.4354 2.90425 24.4354 3.5679 23.7522L12.1422 14.9252Z"
									fill="#343A44"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Toolbar;
