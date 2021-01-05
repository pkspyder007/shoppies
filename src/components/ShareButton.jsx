import React from 'react'

export default function ShareButton() {
    const handleShare = async () => {
        try {
            await navigator.share({
                title: 'The Shoppies Nominations',
                text: "Vote Your favorite movies in the biggest award function.",
                url: 'https://theshoppies.netlify.app' 
            }); 
            alert("Thanks your inviting your friends.");
        } catch (error) {
            try {
                await navigator.clipboard.writeText('https://theshoppies.netlify.app')
                alert("Link copied to clipboard.");
            } catch (err) {
                alert("Your browser doesn't support sharing feature and clipboard copying. Please manually share the link.");
                console.error('Failed to copy!', err)
              }

        }
    }
    return (
        <div>
          <button className="btn_primary" onClick={handleShare}>Share this link with your friends</button>  
        </div>
    )
}
