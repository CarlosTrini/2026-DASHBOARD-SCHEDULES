
interface Props {
    type?: 'container' | 'text' | 'avatar';
    className?: string;
    children?: React.ReactNode;
}

const BG_SKELETONS = {
    container: 'pointer-events-none rounded-2xl border border-gray/15 bg-light-accent p-6 shadow-theme-xs dark:border-gray/20 dark:bg-black-light opacity-60 dark:opacity-60',
    text: 'pointer-events-none animate-pulse rounded bg-gray/15 dark:bg-gray/20',
    avatar: 'pointer-events-none animate-pulse rounded-full bg-gray/15 dark:bg-gray/20'

}


const Skeleton = ({ type = 'text', className = '', children }: Props) => {

    return (
        <>
            <div className={`${BG_SKELETONS[type]} ${className}`}>
                {type === 'container' && children}
            </div>
        </>
    );
}

export default Skeleton;