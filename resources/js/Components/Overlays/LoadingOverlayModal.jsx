export default function LoadingOverlay({isLoading}) {
    return (
        <>
            {isLoading && (
                 <div className="absolute inset-0 bg-main_green_primary/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4 rounded-2xl transition-all duration-300">
                    <div className="w-12 h-12 border-4 border-main_lightly/20 border-t-main_lightly rounded-full animate-spin" />
                    <p className="text-xl text-main_lightly font-montserrat-medium animate-pulse">
                        Очищення форми...
                    </p>
                </div>
            )}
        </>
    );
}