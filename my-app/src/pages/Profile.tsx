import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../supabaseClient';
import Image from 'next/image';
import styles from '../styles/Profile.module.css';

interface UserProfile {
    name: string;
    email: string;
    events: string[];
    allergens: string[];
}

const ProfilePage: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                router.push('/signin');
                return;
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('name, email, events, allergens')
                .eq('id', user.id)
                .single();
            
            if (error) {
                console.error('Error fetching profile:', error);
            } else {
                setUserProfile(data);
            }

            setLoading(false);
        };

        fetchUserProfile();
    }, [router]);

    if (loading) return <div>Loading...</div>;
    if (!userProfile) return <div>No profile data found.</div>;

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.logoSection}>
                    <Image src="../assets/dog.png" alt="dog" width={40} height={40} />
                    <span className={styles.logoText}>SparkBytes!</span>
                </div>
                <nav className={styles.nav}>
                    <a href="/">Home</a>
                    <a href="/events">Events</a>
                    <div className={styles.avatarCircle}></div>
                </nav>
            </header>

            <main className={styles.profileContainer}>
                <h1 className={styles.profileTitle}>Personal Profile</h1>

                <div className={styles.profileAvatar}>
                    <div className={styles.avatarIcon}>
                        <span>👤</span>
                        <span className={styles.editIcon}>✏️</span>
                    </div>
                </div>

                <div className={styles.profileField}>
                    <h4>Name</h4>
                    <p>{userProfile.name}</p>
                </div>
                <div className={styles.profileField}>
                    <h4>BU Email</h4>
                    <p>{userProfile.email}</p>
                </div>
                <div className={styles.profileField}>
                    <h4>Signed Up Events</h4>
                    <p>{userProfile.events.join(', ')}</p>
                </div>
                <div className={styles.profileField}>
                    <h4>Allergens</h4>
                    <p>{userProfile.allergens.join(', ')}</p>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;