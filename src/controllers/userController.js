const { auth, db } = require('../../config/firebase');

exports.register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const userRecord = await auth.createUserWithEmailAndPassword(email, password);

        await db.collection('users').doc(userRecord.user.uid).set({
            username: username,
            email: email,
            createdAt: new Date().toISOString()
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userRecord = await auth.signInWithEmailAndPassword(email, password);

        res.status(200).json({ message: 'User logged in successfully', uid: userRecord.user.uid });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ error: 'Failed to log in' });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        await auth.sendPasswordResetEmail(email);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        res.status(500).json({ error: 'Failed to send password reset email' });
    }
};
