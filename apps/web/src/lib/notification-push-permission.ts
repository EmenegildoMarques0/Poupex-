/**
 * Pede permissão ao usuário para notificações do navegador
 * @returns status da permissão: 'granted' | 'denied' | 'default'
 */

export async function requestPushPermission(): Promise<NotificationPermission> {
    if (!("Notification" in window)) {
        console.warn("Notificações não suportadas neste navegador.");
        return "denied";
    }

    if (Notification.permission === "granted") {
        return "granted";
    }
    const permission = await Notification.requestPermission();
    return permission;
}
