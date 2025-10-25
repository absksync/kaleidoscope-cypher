#!/usr/bin/env python3
"""
Project Kaleidoscope - UNIFIED SYSTEM: Complete Cognitive Diversity Engine
Integrates ALL steps: Backend + NLP + Combinations + Diversity + Questioning + Conversational AI

🌈 COMPLETE FEATURE SET:
- Step 1: Flask Backend with REST API
- Step 2: NLP Embeddings for semantic analysis  
- Step 3: Idea Combination Engine with principle extraction
- Step 4: Diversity Meter with multi-dimensional scoring
- Step 5: Rigorous Questioning & SWOT Analysis
- Step 6: Conversational AI with Memory & Voice Integration
"""

from flask import Flask, request, jsonify
import numpy as np
import re
from collections import Counter
from datetime import datetime
import random
import json
import time

app = Flask(__name__)
app.secret_key = 'kaleidoscope_unified_2025'

# Enable CORS for frontend integration
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# ===== GLOBAL STORAGE =====
ideas = []
embeddings = []
combinations = []
conversation_histories = {}
user_contexts = {}

# ===== STEP 2: NLP EMBEDDINGS ENGINE =====

def create_simple_embedding(text, dimensions=128):
    """Create deterministic embedding for diversity calculations"""
    text = text.lower().strip()
    words = re.findall(r'\w+', text)
    
    features = []
    
    # Word frequency features
    word_counts = Counter(words)
    common_words = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']
    meaningful_words = [w for w in words if w not in common_words and len(w) > 2]
    
    # Length and structure features
    features.extend([
        len(text) % 100,
        len(words) % 50,
        len(set(words)) % 30,
        len(meaningful_words) % 40,
        text.count('?') + text.count('!'),
    ])
    
    # Topic signature based on domain keywords
    topic_words = {
        'tech': ['ai', 'technology', 'digital', 'app', 'smart', 'system', 'algorithm', 'data', 'software', 'platform'],
        'social': ['community', 'people', 'social', 'human', 'culture', 'education', 'network', 'collaboration'],
        'env': ['environment', 'green', 'sustainable', 'eco', 'waste', 'energy', 'climate', 'renewable'],
        'business': ['business', 'market', 'profit', 'cost', 'revenue', 'customer', 'startup', 'entrepreneur'],
        'health': ['health', 'medical', 'wellness', 'fitness', 'nutrition', 'mental', 'care', 'therapy']
    }
    
    for domain, keywords in topic_words.items():
        domain_score = sum(1 for word in meaningful_words if word in keywords)
        features.append(domain_score % 10)
    
    # Character-based features for uniqueness
    char_features = []
    for i in range(26):
        char = chr(ord('a') + i)
        char_features.append(text.count(char) % 8)
    
    features.extend(char_features[:15])
    
    # Pad or truncate to exact dimensions
    while len(features) < dimensions:
        features.append(0)
    
    return np.array(features[:dimensions], dtype=np.float32)

# ===== STEP 3: IDEA COMBINATION ENGINE =====

def extract_core_principles(idea_text):
    """Extract key principles and concepts from an idea"""
    text = idea_text.lower()
    
    # Define principle patterns
    principle_patterns = {
        'efficiency': ['fast', 'quick', 'efficient', 'streamline', 'optimize', 'automate'],
        'accessibility': ['easy', 'simple', 'accessible', 'user-friendly', 'intuitive', 'inclusive'],
        'sustainability': ['green', 'eco', 'sustainable', 'renewable', 'environment', 'waste'],
        'collaboration': ['together', 'community', 'share', 'collaborate', 'network', 'social'],
        'innovation': ['new', 'novel', 'creative', 'innovative', 'breakthrough', 'unique'],
        'scalability': ['scale', 'grow', 'expand', 'global', 'mass', 'widespread'],
        'personalization': ['custom', 'personal', 'individual', 'tailored', 'adapt', 'flexible'],
        'integration': ['connect', 'integrate', 'combine', 'unified', 'seamless', 'holistic']
    }
    
    detected_principles = []
    for principle, keywords in principle_patterns.items():
        if any(keyword in text for keyword in keywords):
            detected_principles.append(principle)
    
    # Extract domain focus
    domains = []
    if any(word in text for word in ['health', 'medical', 'fitness', 'wellness']):
        domains.append('health')
    if any(word in text for word in ['education', 'learn', 'teach', 'school', 'student']):
        domains.append('education') 
    if any(word in text for word in ['business', 'startup', 'entrepreneur', 'market']):
        domains.append('business')
    if any(word in text for word in ['tech', 'app', 'software', 'digital', 'ai']):
        domains.append('technology')
    
    return {
        'principles': detected_principles,
        'domains': domains,
        'text_length': len(idea_text),
        'complexity': len(idea_text.split())
    }

def generate_combinations(idea1_id, idea2_id):
    """Generate creative combinations between two ideas"""
    if idea1_id >= len(ideas) or idea2_id >= len(ideas):
        return []
    
    idea1 = ideas[idea1_id]
    idea2 = ideas[idea2_id]
    
    principles1 = extract_core_principles(idea1['idea_text'])
    principles2 = extract_core_principles(idea2['idea_text'])
    
    # Combination strategies
    strategies = [
        f"Merge {idea1['idea_text'][:30]}... with {idea2['idea_text'][:30]}... through shared {principles1['principles'][0] if principles1['principles'] else 'innovation'} approach",
        f"Apply {principles2['principles'][0] if principles2['principles'] else 'efficiency'} from idea 2 to enhance idea 1's core functionality",
        f"Create hybrid solution combining {principles1['domains'][0] if principles1['domains'] else 'technology'} and {principles2['domains'][0] if principles2['domains'] else 'social'} domains",
        f"Scale idea 1 using idea 2's {principles2['principles'][-1] if principles2['principles'] else 'accessibility'} principles"
    ]
    
    return strategies[:3]  # Return top 3 combinations

# ===== STEP 4: DIVERSITY METER =====

def calculate_diversity_score(new_embedding):
    """Calculate diversity score based on semantic distance"""
    if len(embeddings) == 0:
        return 1.0  # First idea is fully diverse
    
    # Calculate cosine similarities
    similarities = []
    for existing_embedding in embeddings:
        # Cosine similarity
        dot_product = np.dot(new_embedding, existing_embedding)
        norm_product = np.linalg.norm(new_embedding) * np.linalg.norm(existing_embedding)
        
        if norm_product > 0:
            similarity = dot_product / norm_product
            similarities.append(similarity)
    
    if not similarities:
        return 1.0
    
    # Diversity = 1 - max_similarity (more diverse = less similar to existing ideas)
    max_similarity = max(similarities)
    diversity = 1.0 - max_similarity
    
    # Ensure score is between 0 and 1
    return max(0.0, min(1.0, diversity))

def analyze_idea_diversity(idea_text):
    """Comprehensive diversity analysis"""
    embedding = create_simple_embedding(idea_text)
    semantic_diversity = calculate_diversity_score(embedding)
    
    # Keyword-based diversity check
    words = set(re.findall(r'\w+', idea_text.lower()))
    existing_words = set()
    for idea in ideas:
        existing_words.update(re.findall(r'\w+', idea['idea_text'].lower()))
    
    if len(existing_words) > 0:
        keyword_overlap = len(words.intersection(existing_words)) / len(words)
        keyword_diversity = 1.0 - keyword_overlap
    else:
        # If no existing ideas, calculate intrinsic keyword diversity
        # Based on vocabulary richness
        keyword_diversity = min(1.0, len(words) / 20.0)  # Normalize to 20 unique words
    
    # Combined diversity score (weighted)
    combined_diversity = (semantic_diversity * 0.7) + (keyword_diversity * 0.3)
    
    return {
        'semantic_diversity': round(semantic_diversity, 3),
        'keyword_diversity': round(keyword_diversity, 3), 
        'combined_diversity': round(combined_diversity, 3),
        'diversity_level': 'High' if combined_diversity > 0.7 else 'Medium' if combined_diversity > 0.4 else 'Low'
    }


def analyze_standalone_idea_diversity(idea_text):
    """Analyze diversity of a single idea based on its intrinsic characteristics"""
    text_lower = idea_text.lower()
    words = re.findall(r'\w+', text_lower)
    unique_words = set(words)
    
    # Domain detection based on keywords
    domain_keywords = {
        'technology': ['app', 'mobile', 'software', 'digital', 'ai', 'data', 'platform', 'tech', 'online', 'web', 'cloud', 'algorithm'],
        'health': ['health', 'fitness', 'medical', 'wellness', 'therapy', 'exercise', 'nutrition', 'disease', 'treatment'],
        'education': ['education', 'learning', 'teaching', 'student', 'course', 'training', 'knowledge', 'skill'],
        'business': ['business', 'market', 'customer', 'revenue', 'sales', 'profit', 'service', 'company', 'enterprise'],
        'social': ['social', 'community', 'people', 'network', 'collaboration', 'sharing', 'connect', 'friend'],
        'environment': ['environment', 'sustainable', 'green', 'eco', 'energy', 'climate', 'recycling', 'conservation'],
        'entertainment': ['game', 'entertainment', 'music', 'video', 'media', 'content', 'creative', 'art'],
        'finance': ['finance', 'money', 'payment', 'banking', 'investment', 'cryptocurrency', 'wallet', 'transaction']
    }
    
    # Count domains present
    domains_found = []
    for domain, keywords in domain_keywords.items():
        if any(keyword in text_lower for keyword in keywords):
            domains_found.append(domain)
    
    # Vocabulary richness (unique words / total words)
    vocabulary_richness = len(unique_words) / max(len(words), 1)
    
    # Concept complexity (based on word length and unique concepts)
    avg_word_length = sum(len(word) for word in unique_words) / max(len(unique_words), 1)
    complexity_score = min(1.0, (avg_word_length / 8.0) * vocabulary_richness)
    
    # Domain diversity (how many different domains are touched)
    domain_diversity = min(1.0, len(domains_found) / 3.0)  # Normalize to 3 domains
    
    # Semantic diversity based on embedding variance
    embedding = create_simple_embedding(idea_text)
    embedding_variance = np.var(embedding)
    semantic_score = min(1.0, embedding_variance * 100)  # Scale variance
    
    # Combined score
    combined_diversity = (
        vocabulary_richness * 0.25 +
        complexity_score * 0.25 +
        domain_diversity * 0.30 +
        semantic_score * 0.20
    )
    
    return {
        'semantic_diversity': round(semantic_score, 3),
        'keyword_diversity': round(vocabulary_richness, 3),
        'combined_diversity': round(combined_diversity, 3),
        'diversity_level': 'High' if combined_diversity > 0.6 else 'Medium' if combined_diversity > 0.35 else 'Low',
        'domains_detected': domains_found,
        'vocabulary_richness': round(vocabulary_richness, 3),
        'complexity_score': round(complexity_score, 3)
    }


# ===== STEP 5: RIGOROUS QUESTIONING & SWOT ANALYSIS =====

class SocraticQuestioningEngine:
    """Generates probing questions to improve ideas"""
    
    def __init__(self):
        self.question_templates = {
            'clarification': [
                "What exactly do you mean by '{concept}'?",
                "Could you give me a specific example of how {concept} would work?",
                "How does this differ from existing solutions like {comparison}?",
                "What would be the core features of this {concept}?"
            ],
            'assumptions': [
                "What assumptions are you making about your target users?",
                "What if people don't want to {action}? What's your backup plan?",
                "Are you assuming that {assumption}? What if that's not true?",
                "What evidence supports the need for this solution?"
            ],
            'implications': [
                "What are the potential negative consequences of implementing this?",
                "How might this impact {stakeholder} in unexpected ways?",
                "What happens if this becomes widely adopted?",
                "What ethical considerations should we think about?"
            ],
            'alternatives': [
                "What other approaches have you considered?",
                "How else might someone solve this problem?",
                "What if we approached this from {alternative_angle}?",
                "Could we achieve similar results with a simpler approach?"
            ]
        }
    
    def generate_questions(self, idea_text, num_questions=3):
        """Generate probing questions for an idea"""
        # Extract key concepts from the idea
        words = re.findall(r'\w+', idea_text.lower())
        meaningful_words = [w for w in words if len(w) > 3]
        
        questions = []
        
        # Select question types
        for category in ['clarification', 'assumptions', 'implications']:
            if len(questions) >= num_questions:
                break
                
            templates = self.question_templates[category]
            template = random.choice(templates)
            
            # Fill in placeholders with relevant concepts
            if '{concept}' in template and meaningful_words:
                concept = random.choice(meaningful_words)
                template = template.replace('{concept}', concept)
            
            if '{action}' in template:
                action_words = ['use this', 'adopt this', 'pay for this', 'change their behavior']
                template = template.replace('{action}', random.choice(action_words))
                
            if '{stakeholder}' in template:
                stakeholders = ['users', 'businesses', 'communities', 'the environment']
                template = template.replace('{stakeholder}', random.choice(stakeholders))
            
            questions.append(template)
        
        return questions

class SWOTAnalysisEngine:
    """Generates contextual SWOT analysis for ideas"""
    
    def analyze_idea(self, idea_text):
        """Generate detailed SWOT analysis based on idea content"""
        text = idea_text.lower()
        words = set(re.findall(r'\w+', text))
        
        # Extract key concepts for contextual analysis
        key_concepts = self._extract_key_concepts(idea_text)
        industry = self._detect_industry(text)
        
        strengths = []
        weaknesses = []
        opportunities = []
        threats = []
        
        # === CONTEXT-AWARE STRENGTHS ===
        
        # Innovation & Technology
        if any(word in text for word in ['ai', 'artificial intelligence', 'machine learning', 'blockchain']):
            strengths.append(f"Leverages cutting-edge {key_concepts.get('tech', 'technology')} for competitive advantage")
        if any(word in text for word in ['innovative', 'unique', 'novel', 'new approach']):
            strengths.append(f"First-mover advantage in {industry} with innovative solution")
        if any(word in text for word in ['platform', 'ecosystem', 'marketplace']):
            strengths.append("Platform model enables network effects and scalability")
            
        # User Experience
        if any(word in text for word in ['simple', 'easy', 'user-friendly', 'intuitive']):
            strengths.append("Low learning curve accelerates user adoption")
        if any(word in text for word in ['mobile', 'app', 'accessible']):
            strengths.append("Mobile-first approach captures growing smartphone user base")
        if any(word in text for word in ['personalized', 'customized', 'tailored']):
            strengths.append("Personalization increases user engagement and retention")
            
        # Operational
        if any(word in text for word in ['automated', 'automation', 'efficient']):
            strengths.append("Automation reduces operational costs and human error")
        if any(word in text for word in ['real-time', 'instant', 'live']):
            strengths.append("Real-time capabilities provide immediate value to users")
        if any(word in text for word in ['integration', 'integrated', 'connect']):
            strengths.append("Integration with existing tools reduces friction in adoption")
            
        # Market Fit
        if any(word in text for word in ['fitness', 'health', 'wellness', 'medical']):
            strengths.append("Addresses growing health consciousness trend")
        if any(word in text for word in ['education', 'learning', 'training']):
            strengths.append("Taps into expanding online education market")
        if any(word in text for word in ['sustainability', 'green', 'eco', 'environment']):
            strengths.append("Aligns with increasing consumer demand for sustainable solutions")
        
        # === CONTEXT-AWARE WEAKNESSES ===
        
        # Technical Challenges
        if any(word in text for word in ['ai', 'machine learning', 'algorithm']):
            weaknesses.append("Requires significant AI/ML expertise and continuous model training")
        if any(word in text for word in ['blockchain', 'decentralized', 'distributed']):
            weaknesses.append("Blockchain complexity may limit mainstream adoption")
        if any(word in text for word in ['complex', 'comprehensive', 'advanced']):
            weaknesses.append("Implementation complexity could extend development timeline")
        if any(word in text for word in ['integration', 'connect', 'api']):
            weaknesses.append("Dependency on third-party integrations creates technical risks")
            
        # Resource Requirements
        if any(word in text for word in ['platform', 'marketplace', 'network']):
            weaknesses.append("Two-sided platform requires critical mass for viability")
        if any(word in text for word in ['data', 'analytics', 'insights']):
            weaknesses.append("Data acquisition and quality maintenance requires ongoing investment")
        if 'subscription' in text or 'premium' in text:
            weaknesses.append("Subscription fatigue may limit user willingness to pay")
            
        # Market Challenges
        if any(word in text for word in ['b2b', 'enterprise', 'business']):
            weaknesses.append("B2B sales cycles are longer and require more resources")
        if any(word in text for word in ['niche', 'specific', 'specialized']):
            weaknesses.append("Narrow market focus limits addressable market size")
        if len(words) < 10:
            weaknesses.append("Concept needs further refinement and detailed feature planning")
        
        # === CONTEXT-AWARE OPPORTUNITIES ===
        
        # Market Growth
        if any(word in text for word in ['mobile', 'app']):
            opportunities.append(f"Mobile market growth in {industry} projected at 15-20% annually")
        if any(word in text for word in ['ai', 'automation', 'smart']):
            opportunities.append("Rising AI adoption creates favorable market conditions")
        if any(word in text for word in ['remote', 'virtual', 'online']):
            opportunities.append("Remote work trend expands addressable market globally")
            
        # Expansion Potential
        if any(word in text for word in ['platform', 'marketplace']):
            opportunities.append("Platform can expand into adjacent verticals and services")
        if any(word in text for word in ['data', 'analytics']):
            opportunities.append("Collected data enables new revenue streams through insights")
        if any(word in text for word in ['social', 'community', 'network']):
            opportunities.append("Community features can drive viral growth")
            
        # Partnerships
        if any(word in text for word in ['integration', 'connect', 'partner']):
            opportunities.append("Strategic partnerships with established players for distribution")
        if any(word in text for word in ['b2b', 'enterprise']):
            opportunities.append("Enterprise contracts provide stable recurring revenue")
        if any(word in text for word in ['api', 'developer', 'open']):
            opportunities.append("Developer ecosystem can accelerate innovation")
            
        # Global & Trends
        if any(word in text for word in ['global', 'international', 'worldwide']):
            opportunities.append("Geographic expansion into emerging markets")
        if any(word in text for word in ['sustainable', 'green', 'eco']):
            opportunities.append("ESG investing trend attracts impact-focused investors")
        
        # === CONTEXT-AWARE THREATS ===
        
        # Competition
        if any(word in text for word in ['mobile', 'app']):
            threats.append(f"Saturated {industry} app market with high user acquisition costs")
        if any(word in text for word in ['platform', 'marketplace']):
            threats.append("Tech giants may enter market with superior resources")
        if any(word in text for word in ['fitness', 'health']):
            threats.append("Established players like Apple Health and Fitbit dominate market")
        if any(word in text for word in ['todo', 'task', 'productivity']):
            threats.append("Intense competition from free alternatives (Todoist, Notion, etc.)")
            
        # Technology
        if any(word in text for word in ['ai', 'machine learning']):
            threats.append("Rapid AI advancement may obsolete current approach")
        if any(word in text for word in ['blockchain', 'crypto', 'decentralized']):
            threats.append("Regulatory uncertainty around blockchain/crypto technologies")
        if any(word in text for word in ['technology', 'digital', 'software']):
            threats.append("Fast-paced technology changes require continuous innovation")
            
        # Regulatory & Privacy
        if any(word in text for word in ['data', 'personal', 'user information']):
            threats.append("Stricter data privacy regulations (GDPR, CCPA) increase compliance costs")
        if any(word in text for word in ['health', 'medical', 'healthcare']):
            threats.append("Healthcare regulations (HIPAA) add complexity and costs")
        if any(word in text for word in ['financial', 'payment', 'money']):
            threats.append("Financial regulations require licensing and compliance infrastructure")
            
        # Market Dynamics
        if any(word in text for word in ['subscription', 'saas', 'recurring']):
            threats.append("Economic downturn may increase subscription churn rates")
        if any(word in text for word in ['b2b', 'enterprise']):
            threats.append("Enterprise budget cuts during economic uncertainty")
        
        # === FALLBACK ITEMS (ensure minimum coverage) ===
        
        if not strengths:
            strengths.append(f"Addresses genuine need in {industry} market")
            strengths.append("Clear value proposition for target users")
        elif len(strengths) < 2:
            strengths.append("Potential for strong user engagement and retention")
            
        if not weaknesses:
            weaknesses.append("Requires substantial initial investment in development")
            weaknesses.append("User acquisition in competitive market poses challenges")
        elif len(weaknesses) < 2:
            weaknesses.append("Building brand awareness requires significant marketing budget")
            
        if not opportunities:
            opportunities.append(f"Growing demand in {industry} sector")
            opportunities.append("Potential for geographic and demographic expansion")
        elif len(opportunities) < 2:
            opportunities.append("Strategic partnerships could accelerate growth")
            
        if not threats:
            threats.append("Well-funded competitors may replicate features quickly")
            threats.append("Changing user preferences require continuous adaptation")
        elif len(threats) < 2:
            threats.append("Market saturation may limit growth potential")
        
        return {
            'strengths': strengths[:4],  # Limit to top 4 per category
            'weaknesses': weaknesses[:4],
            'opportunities': opportunities[:4],
            'threats': threats[:4]
        }
    
    def _extract_key_concepts(self, text):
        """Extract key concepts from idea text"""
        concepts = {}
        text_lower = text.lower()
        
        # Technology concepts
        tech_words = ['ai', 'blockchain', 'machine learning', 'platform', 'app', 'software']
        for tech in tech_words:
            if tech in text_lower:
                concepts['tech'] = tech
                break
        
        return concepts
    
    def _detect_industry(self, text):
        """Detect the primary industry/domain"""
        industries = {
            'health & wellness': ['health', 'fitness', 'wellness', 'medical', 'therapy'],
            'education': ['education', 'learning', 'teaching', 'training', 'course'],
            'fintech': ['finance', 'payment', 'banking', 'crypto', 'investment'],
            'e-commerce': ['marketplace', 'shopping', 'retail', 'store', 'commerce'],
            'productivity': ['productivity', 'task', 'todo', 'project management'],
            'social': ['social', 'community', 'network', 'connect', 'chat'],
            'enterprise': ['enterprise', 'b2b', 'business', 'corporate'],
            'consumer tech': ['mobile', 'app', 'consumer', 'user']
        }
        
        for industry, keywords in industries.items():
            if any(keyword in text for keyword in keywords):
                return industry
        
        return 'technology'


# ===== STEP 6: CONVERSATIONAL AI WITH MEMORY =====

class ConversationMemory:
    """Enhanced memory system with buffer management and context awareness"""
    
    def __init__(self, max_messages=8):
        self.max_messages = max_messages
        self.conversation_states = {}  # Track conversation flow state
        self.user_profiles = {}  # Store user interests and patterns
    
    def update_history(self, user_id, message, sender="user", metadata=None):
        """Update conversation history with enhanced context tracking"""
        if user_id not in conversation_histories:
            conversation_histories[user_id] = []
            self.conversation_states[user_id] = {
                'current_flow': 'initial',
                'topics_discussed': [],
                'last_intent': None,
                'engagement_level': 'curious'
            }
        
        # Enhanced message storage with metadata
        message_data = {
            "sender": sender,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "metadata": metadata or {}
        }
        
        conversation_histories[user_id].append(message_data)
        
        # Update conversation state
        if sender == "user":
            self._update_user_profile(user_id, message)
        
        # Keep only recent messages for performance
        if len(conversation_histories[user_id]) > self.max_messages:
            # Summarize oldest messages before removing them
            oldest_messages = conversation_histories[user_id][:2]
            summary = self._summarize_old_context(oldest_messages)
            
            conversation_histories[user_id] = conversation_histories[user_id][-self.max_messages:]
            
            # Store summary in user profile
            if user_id not in self.user_profiles:
                self.user_profiles[user_id] = {'conversation_summary': []}
            self.user_profiles[user_id]['conversation_summary'].append(summary)
    
    def get_history(self, user_id):
        """Get conversation history for a user"""
        return conversation_histories.get(user_id, [])
    
    def get_structured_context(self, user_id, turns=4):
        """Enhanced context with dynamic weighting and conversation coherence"""
        history = self.get_history(user_id)
        if not history:
            return {
                'recent_context': "New conversation - no prior context",
                'weighted_context': "",
                'user_topics': [],
                'conversation_flow': 'initial',
                'engagement_pattern': 'first_interaction',
                'context_depth': 0
            }
        
        # Get recent messages with weighted importance
        recent_messages = history[-turns*2:]  # Get last N user-AI pairs
        weighted_context = self._build_weighted_context(recent_messages)
        
        # Build conversation memory prompt (like ChatGPT)
        context_prompt = self._build_context_prompt(recent_messages, user_id)
        
        # Extract topics and patterns with recency weighting
        user_messages = [msg["message"] for msg in history if msg["sender"] == "user"]
        topics = self._extract_topics_with_weights(user_messages)
        
        # Get conversation state
        state = self.conversation_states.get(user_id, {})
        
        return {
            'recent_context': weighted_context,
            'context_prompt': context_prompt,
            'user_topics': topics,
            'conversation_flow': state.get('current_flow', 'initial'),
            'last_intent': state.get('last_intent'),
            'engagement_level': state.get('engagement_level', 'curious'),
            'total_exchanges': len([m for m in history if m["sender"] == "user"]),
            'context_depth': len(recent_messages),
            'conversation_themes': self._identify_conversation_themes(user_messages)
        }
    
    def _build_weighted_context(self, messages):
        """Build context with recency and importance weighting"""
        if not messages:
            return "Fresh conversation"
        
        context_parts = []
        
        # Weight recent messages more heavily
        for i, msg in enumerate(messages):
            weight = (i + 1) / len(messages)  # More recent = higher weight
            sender = "User" if msg["sender"] == "user" else "KAI"
            
            # Truncate based on importance
            if weight > 0.7:  # Most recent - keep full message
                content = msg["message"]
            elif weight > 0.4:  # Moderately recent - keep key parts
                content = msg["message"][:150] + "..." if len(msg["message"]) > 150 else msg["message"]
            else:  # Older - just key concepts
                content = self._extract_key_concepts(msg["message"])
            
            context_parts.append(f"{sender}: {content}")
        
        return "\n".join(context_parts[-6:])  # Keep last 6 weighted entries
    
    def _build_context_prompt(self, messages, user_id):
        """Build ChatGPT-style conversation context prompt"""
        if not messages:
            return "KAI is starting a fresh ideation session with a new user."
        
        # Get user profile for personalization
        profile = self.user_profiles.get(user_id, {})
        interests = profile.get('idea_domains', [])
        
        context_lines = []
        
        # Add user context
        if interests:
            context_lines.append(f"User's areas of interest: {', '.join(interests[:3])}")
        
        # Add conversation history
        context_lines.append("Recent conversation:")
        
        for msg in messages[-6:]:  # Last 3 exchanges
            sender = msg["sender"].title()
            content = msg["message"][:200] + "..." if len(msg["message"]) > 200 else msg["message"]
            context_lines.append(f"{sender}: {content}")
        
        # Add current conversation state
        state = self.conversation_states.get(user_id, {})
        flow = state.get('current_flow', 'initial')
        context_lines.append(f"Current conversation phase: {flow}")
        
        return "\n".join(context_lines)
    
    def _extract_topics_with_weights(self, messages):
        """Extract topics with recency weighting for better relevance"""
        if not messages:
            return []
        
        # Weight recent messages more heavily
        weighted_text = ""
        for i, message in enumerate(messages):
            weight = (i + 1) / len(messages)
            # Repeat recent messages to give them more weight in topic extraction
            repetitions = int(weight * 3) + 1
            weighted_text += (message.lower() + " ") * repetitions
        
        return self._extract_topics([weighted_text])
    
    def _extract_key_concepts(self, text):
        """Extract key concepts for older context compression"""
        words = re.findall(r'\w+', text.lower())
        
        # Keep important concept words
        important_words = []
        concept_indicators = ['app', 'system', 'platform', 'solution', 'idea', 'concept', 
                            'business', 'market', 'user', 'technology', 'ai', 'data',
                            'health', 'education', 'social', 'environment', 'green']
        
        for word in words:
            if len(word) > 4 and (word in concept_indicators or word not in ['that', 'this', 'with', 'have', 'been']):
                important_words.append(word)
        
        return " ".join(important_words[:8])  # Top 8 concepts
    
    def _identify_conversation_themes(self, messages):
        """Identify overarching themes in the conversation"""
        if not messages:
            return []
        
        all_text = " ".join(messages).lower()
        
        themes = []
        theme_patterns = {
            'innovation_focus': ['innovative', 'creative', 'new', 'novel', 'breakthrough', 'unique'],
            'problem_solving': ['problem', 'solve', 'solution', 'fix', 'address', 'challenge'],
            'user_centered': ['user', 'people', 'customer', 'audience', 'community', 'human'],
            'technology_driven': ['ai', 'tech', 'digital', 'algorithm', 'data', 'smart', 'automated'],
            'business_oriented': ['market', 'business', 'profit', 'revenue', 'startup', 'entrepreneur'],
            'impact_focused': ['impact', 'change', 'improve', 'help', 'benefit', 'difference']
        }
        
        for theme, keywords in theme_patterns.items():
            if sum(1 for keyword in keywords if keyword in all_text) >= 2:
                themes.append(theme)
        
        return themes[:3]  # Top 3 themes
    
    def update_conversation_state(self, user_id, new_flow=None, intent=None, engagement=None):
        """Update conversation flow state"""
        if user_id not in self.conversation_states:
            self.conversation_states[user_id] = {
                'current_flow': 'initial',
                'topics_discussed': [],
                'last_intent': None,
                'engagement_level': 'curious'
            }
        
        if new_flow:
            self.conversation_states[user_id]['current_flow'] = new_flow
        if intent:
            self.conversation_states[user_id]['last_intent'] = intent
        if engagement:
            self.conversation_states[user_id]['engagement_level'] = engagement
    
    def _update_user_profile(self, user_id, message):
        """Update user interest profile based on messages"""
        if user_id not in self.user_profiles:
            self.user_profiles[user_id] = {
                'interests': [],
                'communication_style': 'analytical',
                'idea_domains': []
            }
        
        # Extract and store user interests/domains
        domains = self._extract_domains(message)
        for domain in domains:
            if domain not in self.user_profiles[user_id]['idea_domains']:
                self.user_profiles[user_id]['idea_domains'].append(domain)
    
    def _extract_topics(self, messages):
        """Extract key topics from conversation"""
        all_text = " ".join(messages).lower()
        words = re.findall(r'\w+', all_text)
        
        # Topic keywords
        topic_map = {
            'technology': ['app', 'ai', 'digital', 'tech', 'software', 'platform', 'algorithm'],
            'business': ['market', 'business', 'startup', 'revenue', 'customer', 'profit'],
            'education': ['learn', 'teach', 'education', 'student', 'school', 'training'],
            'health': ['health', 'medical', 'fitness', 'wellness', 'mental', 'care'],
            'environment': ['green', 'sustainable', 'eco', 'environment', 'waste', 'climate'],
            'social': ['community', 'social', 'people', 'culture', 'collaboration', 'network']
        }
        
        detected_topics = []
        for topic, keywords in topic_map.items():
            if any(keyword in words for keyword in keywords):
                detected_topics.append(topic)
        
        return detected_topics[:3]  # Return top 3 topics
    
    def _extract_domains(self, message):
        """Extract idea domains from a message"""
        return self._extract_topics([message])
    
    def _summarize_old_context(self, old_messages):
        """Create summary of older conversation turns"""
        if not old_messages:
            return ""
        
        user_messages = [msg['message'] for msg in old_messages if msg['sender'] == 'user']
        if user_messages:
            return f"Earlier discussion: {user_messages[0][:50]}..."
        return "Previous conversation context"
    
    def get_conversation_insights(self, user_id):
        """Get insights about user's conversation patterns"""
        history = self.get_history(user_id)
        if not history:
            return {}
        
        user_messages = [msg for msg in history if msg["sender"] == "user"]
        
        return {
            'total_ideas_shared': len(user_messages),
            'avg_message_length': sum(len(msg['message']) for msg in user_messages) // max(len(user_messages), 1),
            'primary_interests': self._extract_topics([msg['message'] for msg in user_messages]),
            'conversation_depth': len(history) // 2,  # Number of back-and-forth exchanges
            'engagement_indicators': self._assess_engagement(user_messages)
        }
    
    def _assess_engagement(self, user_messages):
        """Assess user engagement level from message patterns"""
        if not user_messages:
            return 'new_user'
        
        avg_length = sum(len(msg['message']) for msg in user_messages) // len(user_messages)
        question_count = sum(1 for msg in user_messages if '?' in msg['message'])
        
        if avg_length > 100 and question_count > 0:
            return 'highly_engaged'
        elif avg_length > 50:
            return 'moderately_engaged'
        else:
            return 'exploring'

class ConversationRouter:
    """Enhanced routing with context-aware intent detection and flow management"""
    
    def __init__(self):
        self.questioning_engine = SocraticQuestioningEngine()
        self.swot_engine = SWOTAnalysisEngine()
        self.last_responses = {}  # Track recent responses to avoid repetition
        self.response_similarity_threshold = 0.75  # Similarity threshold for repetition detection
    
    def detect_intent(self, message, context=None):
        """Enhanced contextual intent detection with logical flow control"""
        message = message.lower()
        context_data = context or {}
        
        # Primary intent patterns (enhanced)
        intent_patterns = {
            'idea_submission': [
                'i want to', 'i have an idea', 'what about', 'concept', 'solution', 
                'app that', 'system for', 'platform', 'service that', 'tool to', 'create'
            ],
            'seeking_challenge': [
                'challenge', 'why', 'assume', 'what if', 'problem with', 
                'weakness', 'risk', 'downside', 'limitation', 'wrong with'
            ],
            'requesting_swot': [
                'swot', 'analyze', 'strengths', 'weaknesses', 'opportunities', 
                'threats', 'evaluation', 'assessment', 'pros and cons', 'strategic'
            ],
            'wanting_reframe': [
                'different angle', 'new perspective', 'reframe', 'alternative', 
                'other way', 'fresh approach', 'twist on', 'variation', 'pivot'
            ],
            'combination_request': [
                'combine', 'merge', 'together', 'hybrid', 'mix', 'blend', 
                'integrate', 'cross', 'fusion', 'connect'
            ],
            'seeking_validation': [
                'good idea', 'think about', 'what do you', 'feedback', 'opinion',
                'sounds like', 'make sense', 'viable'
            ],
            'asking_questions': [
                'how', 'what', 'when', 'where', 'who', 'which', 'should i', 'can i'
            ],
            'follow_up_detail': [
                'tell me more', 'continue', 'elaborate', 'explain', 'details', 
                'go deeper', 'more about', 'expand on'
            ]
        }
        
        # Contextual intent scoring with conversation awareness
        intent_scores = {}
        
        for intent, patterns in intent_patterns.items():
            score = sum(2 if pattern in message else 0 for pattern in patterns)
            
            # Context-based scoring adjustments
            current_flow = context_data.get('conversation_flow', 'initial')
            last_intent = context_data.get('last_intent')
            total_exchanges = context_data.get('total_exchanges', 0)
            
            # Logical flow progression bonuses
            if current_flow == 'idea_exploration':
                if intent == 'seeking_challenge':
                    score += 3  # Natural progression after idea exploration
                elif intent == 'asking_questions':
                    score += 2  # Questions are expected
                    
            elif current_flow == 'challenging_phase':
                if intent == 'requesting_swot':
                    score += 4  # Natural after being challenged
                elif intent == 'wanting_reframe':
                    score += 3  # Alternative to SWOT
                    
            elif current_flow == 'analysis_phase':
                if intent == 'combination_request':
                    score += 4  # Natural synthesis step
                elif intent == 'seeking_validation':
                    score += 3  # Validation after analysis
                    
            # Conversation depth adjustments
            if total_exchanges >= 3:
                if intent in ['seeking_challenge', 'requesting_swot']:
                    score += 2  # Deeper analysis after initial exchanges
                elif intent == 'follow_up_detail' and total_exchanges < 2:
                    score -= 2  # Too early for detailed follow-up
            
            # Recent intent consideration (avoid immediate repetition)
            if last_intent == intent and total_exchanges > 1:
                score -= 1  # Slight penalty for immediate repetition
            
            intent_scores[intent] = score
        
        # Find highest scoring intent
        best_intent = max(intent_scores, key=intent_scores.get)
        best_score = intent_scores[best_intent]
        
        # Fallback to contextual general chat if no strong signals
        if best_score == 0:
            return self._contextual_general_intent(context_data)
        
        return best_intent
    
    def _contextual_general_intent(self, context_data):
        """Determine appropriate intent for general chat based on context"""
        current_flow = context_data.get('conversation_flow', 'initial')
        total_exchanges = context_data.get('total_exchanges', 0)
        
        # Contextual defaults based on conversation state
        flow_defaults = {
            'initial': 'seeking_validation',
            'idea_exploration': 'seeking_challenge',
            'challenging_phase': 'requesting_swot',
            'analysis_phase': 'combination_request',
            'synthesis_phase': 'seeking_validation'
        }
        
        # Age-based progression
        if total_exchanges == 0:
            return 'seeking_validation'
        elif total_exchanges <= 2:
            return 'seeking_challenge'
        elif total_exchanges <= 4:
            return 'requesting_swot'
        else:
            return 'combination_request'
        
        return flow_defaults.get(current_flow, 'seeking_validation')
    
    def determine_conversation_flow(self, intent, context_data, user_id):
        """Determine next conversation flow based on intent and context"""
        current_flow = context_data.get('conversation_flow', 'initial')
        exchanges = context_data.get('total_exchanges', 0)
        
        # Flow progression logic
        flow_transitions = {
            'initial': {
                'idea_submission': 'idea_exploration',
                'general_chat': 'warm_up'
            },
            'warm_up': {
                'idea_submission': 'idea_exploration',
                'seeking_challenge': 'challenging_phase'
            },
            'idea_exploration': {
                'seeking_challenge': 'challenging_phase',
                'requesting_swot': 'analysis_phase',
                'follow_up': 'deep_dive'
            },
            'challenging_phase': {
                'requesting_swot': 'analysis_phase',
                'wanting_reframe': 'reframing_phase',
                'follow_up': 'rigorous_questioning'
            },
            'analysis_phase': {
                'combination_request': 'synthesis_phase',
                'wanting_reframe': 'reframing_phase',
                'idea_submission': 'idea_exploration'  # New idea
            },
            'synthesis_phase': {
                'idea_submission': 'idea_exploration',  # Fresh start
                'requesting_swot': 'analysis_phase'
            }
        }
        
        # Determine next flow
        next_flow = flow_transitions.get(current_flow, {}).get(intent, current_flow)
        
        # Auto-progression based on conversation depth
        if exchanges >= 3 and current_flow == 'idea_exploration':
            next_flow = 'challenging_phase'
        elif exchanges >= 5 and current_flow == 'challenging_phase':
            next_flow = 'analysis_phase'
        
        return next_flow
    
    def avoid_repetition(self, response, user_id):
        """Advanced repetition filtering with similarity checking"""
        if user_id not in self.last_responses:
            self.last_responses[user_id] = []
        
        past_responses = self.last_responses[user_id]
        
        # Check for exact or near-exact matches
        response_words = set(response.lower().split())
        
        for past_response in past_responses[-3:]:  # Check last 3 responses
            past_words = set(past_response.lower().split())
            
            # Calculate word overlap similarity
            if len(response_words) > 0 and len(past_words) > 0:
                overlap = len(response_words.intersection(past_words))
                similarity = overlap / min(len(response_words), len(past_words))
                
                if similarity > self.response_similarity_threshold:
                    # Response too similar - diversify it
                    response = self._diversify_response(response, past_responses)
                    break
        
        # Store current response for future checking
        self.last_responses[user_id].append(response)
        if len(self.last_responses[user_id]) > 5:
            self.last_responses[user_id].pop(0)  # Keep only recent responses
        
        return response
    
    def _diversify_response(self, original_response, past_responses):
        """Diversify response when repetition detected"""
        diversification_strategies = [
            lambda resp: resp + " Let's explore this from a different angle.",
            lambda resp: resp + " What other perspectives should we consider?",
            lambda resp: resp + " How might we challenge this assumption differently?",
            lambda resp: "Building on our discussion: " + resp,
            lambda resp: "Taking a fresh approach: " + resp,
            lambda resp: resp + " Let me ask this in a new way.",
            lambda resp: "Continuing our exploration: " + resp,
            lambda resp: resp + " What if we reframe this completely?",
            lambda resp: "Here's another lens to consider: " + resp,
            lambda resp: resp + " Let's dig deeper into this aspect."
        ]
        
        # Choose a diversification strategy that hasn't been used recently
        used_phrases = " ".join(past_responses[-3:]).lower()
        
        for strategy in diversification_strategies:
            diversified = strategy(original_response)
            strategy_key_phrase = diversified.split(original_response)[-1].lower().strip()
            
            if strategy_key_phrase not in used_phrases:
                return diversified
        
        # Fallback: add random variation
        import random
        variations = [
            "Here's a different take: ",
            "Let me approach this differently: ",
            "From another perspective: ",
            "Thinking about this more: ",
            "Building on that idea: "
        ]
        
        return random.choice(variations) + original_response
    
    def get_response_templates(self, intent, sentiment_tone, context_data):
        """Get diverse response templates based on intent and context"""
        templates = {
            'idea_submission': {
                'supportive': [
                    "That's an exciting concept! {context_hook} What specific problem does this solve?",
                    "I love this direction! {context_hook} Who would benefit most from this?", 
                    "Brilliant thinking! {context_hook} What makes this different from existing solutions?",
                    "This has real potential! {context_hook} How did you come up with this approach?"
                ],
                'curious': [
                    "Interesting approach! {context_hook} Help me understand the core value proposition.",
                    "That's a solid foundation. {context_hook} What's the key problem you're addressing?",
                    "Nice concept! {context_hook} What inspired this particular direction?",
                    "Good thinking! {context_hook} Walk me through the user experience."
                ],
                'encouraging': [
                    "You're onto something here! {context_hook} Let's explore what makes this unique.",
                    "That's a promising start! {context_hook} What's your vision for how this works?",
                    "Great direction! {context_hook} How do you see people using this?",
                    "This could work well! {context_hook} What's the core benefit for users?"
                ]
            },
            'seeking_challenge': {
                'collaborative': [
                    "Let's stress-test this! {context_hook} What if users don't want to {assumed_action}?",
                    "Good point to challenge! {context_hook} You're assuming {assumption} - what if that's not true?",
                    "Let's dig deeper! {context_hook} What's the biggest risk with this approach?",
                    "Time to push this further! {context_hook} How might this fail unexpectedly?"
                ],
                'curious': [
                    "Here's a tough question: {context_hook} What if {alternative_scenario}?",
                    "Let me challenge that: {context_hook} Is {assumption} really necessary?",
                    "Something to consider: {context_hook} How would competitors respond to this?",
                    "Worth questioning: {context_hook} What could make this obsolete quickly?"
                ]
            },
            'requesting_swot': {
                'analytical': [
                    "Strategic analysis time! {context_hook} Here's how I see the landscape:",
                    "Let's break this down systematically! {context_hook} SWOT perspective:",
                    "Time for strategic thinking! {context_hook} Here's the competitive analysis:",
                    "Strategic evaluation: {context_hook} Key factors to consider:"
                ]
            },
            'combination_request': {
                'creative': [
                    "Perfect fusion opportunity! {context_hook} Here's how we could blend these:",
                    "Cross-pollination time! {context_hook} I see these synthesis possibilities:",
                    "Creative combination ahead! {context_hook} Let's merge these concepts:",
                    "Hybrid innovation potential! {context_hook} Here are the fusion strategies:"
                ]
            },
            'seeking_validation': {
                'supportive': [
                    "{context_hook} You're definitely on the right track! What feels most promising to you?",
                    "{context_hook} This has strong fundamentals! Which aspect excites you most?",
                    "{context_hook} Solid thinking here! What direction should we explore next?",
                    "{context_hook} You've got something valuable! How do you want to develop this?"
                ],
                'encouraging': [
                    "{context_hook} You're building something meaningful! What's your next step?",
                    "{context_hook} This is worth pursuing! How can we strengthen it further?",
                    "{context_hook} Great foundation work! What piece needs more development?",
                    "{context_hook} You're solving a real problem! Where should we focus next?"
                ]
            }
        }
        
        # Get templates for this intent and tone
        intent_templates = templates.get(intent, templates['seeking_validation'])
        tone_templates = intent_templates.get(sentiment_tone, list(intent_templates.values())[0])
        
        # Select template and fill context variables
        import random
        selected_template = random.choice(tone_templates)
        
        return self._fill_response_template(selected_template, context_data)
    
    def _fill_response_template(self, template, context_data):
        """Fill template variables with contextual information"""
        # Extract context variables
        recent_context = context_data.get('recent_context', '')
        topics = context_data.get('user_topics', [])
        themes = context_data.get('conversation_themes', [])
        
        # Generate context hooks
        context_hooks = self._generate_context_hooks(recent_context, topics, themes)
        
        # Generate contextual assumptions and scenarios
        assumptions = self._extract_assumptions_from_context(recent_context)
        scenarios = self._generate_alternative_scenarios(topics)
        actions = self._extract_user_actions(recent_context)
        
        # Fill template variables
        filled_template = template.format(
            context_hook=context_hooks.get('primary', ''),
            assumption=assumptions.get('primary', 'users will adopt this easily'),
            assumed_action=actions.get('primary', 'use this solution'),
            alternative_scenario=scenarios.get('primary', 'the market shifts unexpectedly')
        )
        
        return filled_template.strip()
    
    def _generate_context_hooks(self, recent_context, topics, themes):
        """Generate contextual conversation hooks"""
        hooks = {}
        
        if topics and len(topics) > 0:
            primary_topic = topics[0]
            hooks['primary'] = f"Since you're focused on {primary_topic},"
        elif 'innovation_focus' in themes:
            hooks['primary'] = "With your innovative approach,"
        elif 'problem_solving' in themes:
            hooks['primary'] = "Given your problem-solving mindset,"
        elif recent_context and len(recent_context) > 50:
            # Extract a concept from recent context
            words = recent_context.split()
            concept_words = [w for w in words if len(w) > 5 and w.lower() not in ['user:', 'kai:']]
            if concept_words:
                hooks['primary'] = f"Building on your {concept_words[0]} concept,"
        
        if not hooks.get('primary'):
            hooks['primary'] = "Thinking about this further,"
        
        return hooks
    
    def _extract_assumptions_from_context(self, recent_context):
        """Extract implicit assumptions from conversation context"""
        assumptions = {}
        
        context_lower = recent_context.lower()
        
        if 'users will' in context_lower or 'people will' in context_lower:
            assumptions['primary'] = 'users will behave predictably'
        elif 'market' in context_lower:
            assumptions['primary'] = 'the market timing is right'
        elif 'technology' in context_lower or 'ai' in context_lower:
            assumptions['primary'] = 'the technology will work as expected'
        else:
            assumptions['primary'] = 'adoption will be straightforward'
        
        return assumptions
    
    def _generate_alternative_scenarios(self, topics):
        """Generate alternative scenarios based on topic domains"""
        scenarios = {}
        
        if not topics:
            scenarios['primary'] = 'user behavior changes unexpectedly'
            return scenarios
        
        scenario_map = {
            'technology': 'new regulations restrict AI usage',
            'business': 'economic conditions shift dramatically',
            'health': 'privacy concerns become paramount',
            'education': 'traditional institutions resist change',
            'environment': 'climate priorities shift focus',
            'social': 'user preferences evolve rapidly'
        }
        
        primary_topic = topics[0]
        scenarios['primary'] = scenario_map.get(primary_topic, 'market conditions change significantly')
        
        return scenarios
    
    def _extract_user_actions(self, recent_context):
        """Extract expected user actions from context"""
        actions = {}
        
        context_lower = recent_context.lower()
        
        action_indicators = {
            'use': 'use this regularly',
            'buy': 'purchase this solution', 
            'adopt': 'adopt this new approach',
            'try': 'try this new method',
            'switch': 'switch from current solutions',
            'change': 'change their behavior'
        }
        
        for indicator, action in action_indicators.items():
            if indicator in context_lower:
                actions['primary'] = action
                break
        
        if not actions.get('primary'):
            actions['primary'] = 'engage with this solution'
        
        return actions
    
    def process_conversation(self, user_id, message, memory):
        """Enhanced conversation processing with intelligence layers"""
        # Get structured context
        context_data = memory.get_structured_context(user_id)
        
        # Analyze sentiment for tone adjustment
        sentiment_data = sentiment_analyzer.analyze_sentiment(message)
        
        # Detect intent with context awareness
        intent = self.detect_intent(message, context_data)
        
        # Determine conversation flow progression
        next_flow = self.determine_conversation_flow(intent, context_data, user_id)
        
        # Update memory with enhanced metadata
        memory.update_history(user_id, message, "user", {
            'intent': intent,
            'sentiment': sentiment_data['sentiment'],
            'flow_phase': next_flow
        })
        
        # Update conversation state
        memory.update_conversation_state(
            user_id, 
            new_flow=next_flow,
            intent=intent,
            engagement=sentiment_data['recommended_tone']
        )
        
        response_data = {
            'intent': intent,
            'conversation_flow': next_flow,
            'sentiment_analysis': sentiment_data,
            'context_insights': context_data,
            'timestamp': datetime.now().isoformat()
        }
        
        # Generate contextually appropriate response
        response_data.update(self._generate_intelligent_response(
            message, user_id, intent, next_flow, context_data, sentiment_data
        ))
        
        # Apply tone adjustment with personality consistency
        if 'response' in response_data:
            # First apply sentiment tone adjustment
            response_data['response'] = sentiment_analyzer.get_tone_adjusted_prompt(
                response_data['response'], sentiment_data
            )
            
            # Then ensure personality consistency
            conversation_context = memory.get_history(user_id)
            recent_responses = [msg['message'] for msg in conversation_context[-6:] 
                             if msg['sender'] == 'assistant']
            
            response_data['response'] = personality_manager.enforce_personality_consistency(
                response_data['response'], recent_responses
            )
            
            # Apply repetition filtering
            response_data['response'] = router.avoid_repetition(
                response_data['response'], user_id
            )
        
        # Update conversation history with AI response
        memory.update_history(user_id, response_data['response'], "assistant", {
            'intent_handled': intent,
            'flow_phase': next_flow,
            'tone_used': sentiment_data['recommended_tone'],
            'personality_consistent': True
        })
        
        return response_data
    
    def _generate_intelligent_response(self, message, user_id, intent, flow_phase, context_data, sentiment_data):
        """Generate contextually intelligent responses using flow templates and analysis"""
        
        # Avoid repetitive responses
        if user_id in self.last_responses:
            recent_responses = self.last_responses[user_id]
        else:
            recent_responses = []
            self.last_responses[user_id] = recent_responses
        
        # Determine turn position in current flow
        exchanges = context_data.get('total_exchanges', 0)
        turn_position = exchanges % 3  # Cycle through flow positions
        
        # Get personality-aware response template first
        recommended_tone = sentiment_data.get('recommended_tone', 'curious')
        template_response = self.get_response_templates(intent, recommended_tone, context_data)
        
        # Check if template response is suitable (not repetitive)
        if template_response and not self._is_repetitive(template_response, recent_responses):
            base_response = template_response
        else:
            # Fallback to dialogue flow
            flow_response = dialogue_flow.get_response_for_flow(flow_phase, turn_position, context_data)
            base_response = flow_response if flow_response else "Let me think about this differently."
            
            # Add analysis components based on intent
            if intent == 'idea_submission':
                analysis_data = self._handle_idea_submission(message, user_id)
                enhanced_response = self._enhance_idea_response(base_response, analysis_data)
                
            elif intent == 'requesting_swot':
                swot_data = self._handle_analysis_request(message, user_id)
                enhanced_response = self._enhance_swot_response(base_response, swot_data)
                
            elif intent == 'combination_request':
                combo_data = self._handle_combination_request(message, user_id)
                enhanced_response = self._enhance_combination_response(base_response, combo_data)
                
            else:
                # Use flow response as-is for other intents
                enhanced_response = base_response
            
            # Track response to avoid future repetition
            recent_responses.append(enhanced_response[:50])
            if len(recent_responses) > 5:
                recent_responses.pop(0)
            
            return {'response': enhanced_response}
        
        # Fallback to legacy handlers if flow response not suitable
        return self._fallback_response_handler(intent, message, user_id)
    
    def _enhance_idea_response(self, flow_response, analysis_data):
        """Enhance flow response with idea analysis data"""
        if 'diversity_score' in analysis_data and 'questions' in analysis_data:
            enhancement = f"\n\n📊 **Quick Analysis:**\n• Diversity: {analysis_data['diversity_score']['diversity_level']}\n• Key Question: {analysis_data['questions'][0] if analysis_data['questions'] else 'How might this evolve?'}"
            return flow_response + enhancement
        return flow_response
    
    def _enhance_swot_response(self, flow_response, swot_data):
        """Enhance flow response with SWOT analysis"""
        if 'swot' in swot_data:
            swot = swot_data['swot']
            enhancement = f"\n\n**Key Insight:** {swot['strengths'][0] if swot['strengths'] else 'Strong foundation'} vs. {swot['threats'][0] if swot['threats'] else 'Market competition'}"
            return flow_response + enhancement
        return flow_response
    
    def _enhance_combination_response(self, flow_response, combo_data):
        """Enhance flow response with combination suggestions"""
        if 'combinations' in combo_data:
            combinations = combo_data['combinations']
            enhancement = f"\n\n💡 **Top Fusion:** {combinations[0] if combinations else 'Hybrid innovation approach'}"
            return flow_response + enhancement
        return flow_response
    
    def _is_repetitive(self, response, recent_responses):
        """Check if response is too similar to recent ones"""
        response_start = response[:50].lower()
        for recent in recent_responses:
            if response_start in recent.lower() or recent.lower() in response_start:
                return True
        return False
    
    def _fallback_response_handler(self, intent, message, user_id):
        """Fallback to original handlers when flow templates aren't suitable"""
        if intent == 'idea_submission':
            return self._handle_idea_submission(message, user_id)
        elif intent in ['requesting_swot', 'analysis_request']:
            return self._handle_analysis_request(message, user_id)
        elif intent == 'combination_request':
            return self._handle_combination_request(message, user_id)
        elif intent == 'diversity_inquiry':
            return self._handle_diversity_inquiry(message, user_id)
        else:
            return self._handle_general_chat(message, user_id)
    
    def _handle_idea_submission(self, message, user_id):
        """Handle new idea submission and analysis"""
        # Extract the idea from the message
        idea_text = message
        
        # Analyze diversity first
        diversity_analysis = analyze_idea_diversity(idea_text)
        
        # Add idea to storage with diversity score
        idea_data = {
            'id': len(ideas),
            'idea_text': idea_text,
            'timestamp': datetime.now().isoformat(),
            'user_id': user_id,
            'diversity_score': diversity_analysis['combined_diversity']
        }
        ideas.append(idea_data)
        
        # Create embedding
        embedding = create_simple_embedding(idea_text)
        embeddings.append(embedding)
        
        # Generate questions
        questions = self.questioning_engine.generate_questions(idea_text)
        
        # SWOT Analysis
        swot = self.swot_engine.analyze_idea(idea_text)
        
        response = f"""💡 **Idea Captured & Analyzed!**

**Your Idea:** {idea_text}

**🎯 Diversity Analysis:** 
- Diversity Level: {diversity_analysis['diversity_level']}
- Semantic Uniqueness: {diversity_analysis['semantic_diversity']}
- Overall Score: {diversity_analysis['combined_diversity']}

**🤔 Critical Questions to Strengthen Your Idea:**
{chr(10).join([f"• {q}" for q in questions])}

**📊 Quick SWOT Snapshot:**
**Strengths:** {', '.join(swot['strengths'][:2])}
**Key Opportunity:** {swot['opportunities'][0] if swot['opportunities'] else 'Market expansion potential'}

Would you like me to dive deeper into any of these aspects or explore combinations with other ideas?"""
        
        return {
            'response': response,
            'idea_id': idea_data['id'],
            'diversity_score': diversity_analysis,
            'questions': questions,
            'swot': swot
        }
    
    def _handle_analysis_request(self, message, user_id):
        """Handle requests for deeper analysis"""
        if not ideas:
            return {'response': "I'd love to help with analysis! First, please share an idea you'd like me to analyze."}
        
        # Analyze the most recent idea
        latest_idea = ideas[-1]
        swot = self.swot_engine.analyze_idea(latest_idea['idea_text'])
        questions = self.questioning_engine.generate_questions(latest_idea['idea_text'], 5)
        
        response = f"""📊 **Deep Analysis of: "{latest_idea['idea_text'][:50]}..."**

**🔍 SWOT Analysis:**

**💪 Strengths:**
{chr(10).join([f"• {s}" for s in swot['strengths']])}

**⚠️ Weaknesses:**
{chr(10).join([f"• {w}" for w in swot['weaknesses']])}

**🌟 Opportunities:**
{chr(10).join([f"• {o}" for o in swot['opportunities']])}

**⚡ Threats:**
{chr(10).join([f"• {t}" for t in swot['threats']])}

**🧠 Strategic Questions:**
{chr(10).join([f"{i+1}. {q}" for i, q in enumerate(questions)])}

What aspect would you like to explore further?"""
        
        return {'response': response, 'swot': swot, 'questions': questions}
    
    def _handle_combination_request(self, message, user_id):
        """Handle idea combination requests"""
        if len(ideas) < 2:
            return {'response': "I need at least 2 ideas to create combinations. Please share another idea!"}
        
        # Get the two most recent ideas
        idea1 = ideas[-2]
        idea2 = ideas[-1] 
        
        combinations = generate_combinations(idea1['id'], idea2['id'])
        
        response = f"""🔄 **Creative Combinations Generated!**

**Combining:** 
- Idea A: {idea1['idea_text'][:40]}...
- Idea B: {idea2['idea_text'][:40]}...

**🌟 Fusion Strategies:**
{chr(10).join([f"{i+1}. {combo}" for i, combo in enumerate(combinations)])}

**💡 Recommendation:** Try developing combination #1 - it offers the best balance of feasibility and innovation potential.

Would you like me to analyze any of these combinations in detail?"""
        
        return {'response': response, 'combinations': combinations}
    
    def _handle_diversity_inquiry(self, message, user_id):
        """Handle diversity-related questions"""
        if not ideas:
            return {'response': "Share some ideas first, and I'll show you how diverse they are!"}
        
        # Calculate overall portfolio diversity
        total_ideas = len(ideas)
        if total_ideas >= 2:
            avg_diversity = sum([analyze_idea_diversity(idea['idea_text'])['combined_diversity'] for idea in ideas[-5:]]) / min(5, total_ideas)
            
            response = f"""📈 **Diversity Portfolio Analysis**

**Total Ideas:** {total_ideas}
**Average Diversity Score:** {avg_diversity:.2f}

**Diversity Level:** {'🌈 Excellent!' if avg_diversity > 0.7 else '🎯 Good!' if avg_diversity > 0.5 else '⚡ Needs More Variety!'}

**💡 Tip:** {self._get_diversity_tip(avg_diversity)}

Keep exploring different domains and approaches to maximize creative potential!"""
        else:
            response = "Add more ideas to see meaningful diversity analysis! Try exploring different domains like health, education, or sustainability."
        
        return {'response': response}
    
    def _handle_general_chat(self, message, user_id):
        """Handle general conversation"""
        friendly_responses = [
            "I'm here to help you brainstorm and refine ideas! Share any concept you're thinking about.",
            "Let's explore some creative territory! What problem are you passionate about solving?", 
            "I love diving into new ideas! What's on your mind today?",
            "Ready to turn thoughts into breakthrough concepts? What would you like to work on?",
            "I'm your cognitive diversity partner! Share an idea and I'll help you see it from new angles."
        ]
        
        return {'response': random.choice(friendly_responses)}
    
    def _get_diversity_tip(self, score):
        """Get diversity improvement tip"""
        if score > 0.7:
            return "Your ideas span diverse domains! Consider cross-pollinating concepts between different fields."
        elif score > 0.5:
            return "Good variety! Try exploring completely different industries or user groups."
        else:
            return "Try branching into new domains: health, environment, education, or emerging tech areas."

# ===== SENTIMENT AND EMOTIONAL INTELLIGENCE =====

class SentimentAnalyzer:
    """Lightweight sentiment analysis for tone adjustment"""
    
    def __init__(self):
        # Emotional indicators
        self.positive_words = [
            'excited', 'love', 'amazing', 'great', 'awesome', 'brilliant', 
            'fantastic', 'wonderful', 'perfect', 'excellent', 'thrilled'
        ]
        self.negative_words = [
            'worried', 'concerned', 'frustrated', 'difficult', 'hard', 'problem', 
            'issue', 'trouble', 'stuck', 'confused', 'overwhelming'
        ]
        self.uncertainty_words = [
            'maybe', 'perhaps', 'not sure', 'wondering', 'thinking', 'considering', 
            'might', 'possibly', 'unsure', 'hesitant'
        ]
        self.confidence_words = [
            'definitely', 'sure', 'certain', 'confident', 'absolutely', 'clearly', 
            'obviously', 'without doubt', 'positive'
        ]
    
    def analyze_sentiment(self, text):
        """Analyze sentiment and emotional state"""
        text = text.lower()
        
        # Count emotional indicators
        positive_count = sum(1 for word in self.positive_words if word in text)
        negative_count = sum(1 for word in self.negative_words if word in text)
        uncertainty_count = sum(1 for word in self.uncertainty_words if word in text)
        confidence_count = sum(1 for word in self.confidence_words if word in text)
        
        # Punctuation analysis
        excitement = text.count('!') + text.count('!!') * 2
        questioning = text.count('?')
        
        # Determine primary sentiment
        if negative_count > positive_count:
            primary_sentiment = 'concerned'
        elif positive_count > 0 or excitement > 0:
            primary_sentiment = 'enthusiastic'
        elif uncertainty_count > confidence_count:
            primary_sentiment = 'uncertain'
        elif questioning > 2:
            primary_sentiment = 'curious'
        else:
            primary_sentiment = 'neutral'
        
        # Determine appropriate KAI response tone
        tone_mapping = {
            'enthusiastic': 'supportive',
            'concerned': 'reassuring', 
            'uncertain': 'encouraging',
            'curious': 'collaborative',
            'neutral': 'curious'
        }
        
        return {
            'sentiment': primary_sentiment,
            'recommended_tone': tone_mapping[primary_sentiment],
            'confidence_level': confidence_count - uncertainty_count,
            'energy_level': positive_count + excitement - negative_count,
            'needs_reassurance': negative_count > 1 or uncertainty_count > 2
        }
    
    def get_tone_adjusted_prompt(self, base_response, sentiment_data):
        """Adjust response tone based on sentiment analysis"""
        tone = sentiment_data['recommended_tone']
        
        tone_prefixes = {
            'supportive': "That's a fantastic direction! ",
            'reassuring': "I understand your concerns - let's work through this together. ",
            'encouraging': "You're on the right track! Let's explore this further. ",
            'collaborative': "Great question! Let's think through this together. ",
            'curious': "Interesting! "
        }
        
        if sentiment_data['needs_reassurance']:
            tone_prefixes[tone] += "Remember, every great idea starts with uncertainty - that's completely normal. "
        
        return tone_prefixes.get(tone, "") + base_response

# ===== PERSONALITY PERSISTENCE SYSTEM =====

class PersonalityManager:
    """Maintains consistent KAI personality across conversations"""
    
    def __init__(self):
        self.core_persona = {
            'identity': 'KAI is an empathetic, sharp, and Socratic ideation mentor',
            'style': 'Brief, insightful, and question-driven',
            'approach': 'Curious challenger who builds on ideas while pushing boundaries',
            'tone_consistency': 'Warm but analytical, supportive but rigorous'
        }
        
        self.personality_prompts = {
            'system_context': """You are KAI, a cognitive diversity engine and innovation mentor. 
Core traits: Empathetic yet challenging, brief yet insightful, curious yet analytical.
Always remember previous conversation context and avoid repetitive phrases.
Build on user ideas while asking probing questions that strengthen concepts.""",
            
            'response_filters': {
                'avoid_phrases': [
                    'That\'s interesting', 'Tell me more', 'Great question', 
                    'I love that', 'That\'s a good point', 'Absolutely'
                ],
                'personality_reinforcers': [
                    'builds on previous context', 'asks probing questions', 
                    'challenges assumptions', 'provides strategic insight'
                ]
            }
        }
    
    def get_personality_context(self, conversation_phase, user_engagement):
        """Get personality context for current conversation state"""
        base_context = self.personality_prompts['system_context']
        
        # Adjust personality based on conversation phase
        phase_adjustments = {
            'initial': 'Be welcoming but immediately curious. Ask specific questions.',
            'idea_exploration': 'Show genuine interest while probing for depth and clarity.',
            'challenging_phase': 'Be respectfully challenging. Question assumptions constructively.',
            'analysis_phase': 'Shift to strategic thinking. Provide frameworks and insights.',
            'synthesis_phase': 'Focus on creative connections and next steps.'
        }
        
        # Adjust based on user engagement
        engagement_adjustments = {
            'highly_engaged': 'Match their energy with deeper challenges and insights.',
            'moderately_engaged': 'Gently push boundaries while maintaining support.',
            'exploring': 'Be encouraging and guide discovery with questions.',
            'uncertain': 'Provide reassurance while building confidence through questions.'
        }
        
        phase_context = phase_adjustments.get(conversation_phase, '')
        engagement_context = engagement_adjustments.get(user_engagement, '')
        
        return f"{base_context}\n\nCurrent phase guidance: {phase_context}\nUser engagement: {engagement_context}"
    
    def enforce_personality_consistency(self, response, conversation_history):
        """Ensure response maintains personality consistency"""
        # Check for overused phrases
        avoid_phrases = self.personality_prompts['response_filters']['avoid_phrases']
        
        for phrase in avoid_phrases:
            if phrase.lower() in response.lower():
                # Count occurrences in recent history
                recent_history = ' '.join(conversation_history[-3:]) if conversation_history else ''
                if recent_history.lower().count(phrase.lower()) >= 1:
                    # Replace with personality-consistent alternative
                    response = self._replace_generic_phrase(response, phrase)
        
        return response
    
    def _replace_generic_phrase(self, response, generic_phrase):
        """Replace generic phrases with personality-consistent alternatives"""
        replacements = {
            "That's interesting": [
                "This opens up possibilities", "I see potential here", "This direction has merit"
            ],
            "Tell me more": [
                "What's driving this thinking?", "How does this solve the core problem?", 
                "What's the key insight behind this?"
            ],
            "Great question": [
                "That touches on something important", "This gets to the heart of it", 
                "You're identifying a crucial factor"
            ],
            "I love that": [
                "This approach has strength", "There's solid thinking here", 
                "This tackles the problem well"
            ],
            "That's a good point": [
                "You're onto something significant", "This insight matters", 
                "This perspective adds value"
            ]
        }
        
        if generic_phrase in replacements:
            import random
            replacement = random.choice(replacements[generic_phrase])
            response = response.replace(generic_phrase, replacement)
        
        return response
    
    def get_conversation_continuity_prompt(self, context_data):
        """Generate personality-consistent continuity prompts"""
        recent_topics = context_data.get('user_topics', [])
        themes = context_data.get('conversation_themes', [])
        flow = context_data.get('conversation_flow', 'initial')
        
        if recent_topics and flow != 'initial':
            topic = recent_topics[0]
            continuity_prompts = [
                f"Building on your {topic} concept,",
                f"Continuing our {topic} discussion,", 
                f"Given your focus on {topic},",
                f"Since we're exploring {topic},"
            ]
            import random
            return random.choice(continuity_prompts)
        
        return ""

# ===== DIALOGUE FLOW TEMPLATES =====

class DialogueFlowManager:
    """Manages structured conversation flows with templates"""
    
    def __init__(self):
        self.flow_templates = {
            'idea_exploration': {
                'turns': ['acknowledge', 'clarify', 'challenge_preview'],
                'responses': {
                    'acknowledge': [
                        "That's a compelling idea! I can see the potential in {domain}.",
                        "Interesting approach to {problem_area}! You're thinking creatively.",
                        "I like where you're going with this {concept_type} concept."
                    ],
                    'clarify': [
                        "Help me understand - what specific problem does this solve for users?",
                        "Who exactly would benefit most from this solution?",
                        "What makes this different from existing approaches?"
                    ],
                    'challenge_preview': [
                        "This has strong potential. Ready for me to ask some challenging questions to strengthen it?",
                        "I see several opportunities here. Want me to help stress-test the concept?",
                        "Let's dig deeper - shall I challenge some assumptions to make this even stronger?"
                    ]
                }
            },
            'challenging_phase': {
                'turns': ['assumption_challenge', 'weakness_probe', 'alternative_explore'],
                'responses': {
                    'assumption_challenge': [
                        "You're assuming {assumption}. What if that's not true? How would that change your approach?",
                        "I notice you believe {belief}. What evidence supports this? What if users behave differently?",
                        "What if your target market doesn't want to {action}? What's your backup plan?"
                    ],
                    'weakness_probe': [
                        "What's the biggest weakness in this concept right now?",
                        "If this fails, what would be the most likely reason?",
                        "What could a competitor do better than your approach?"
                    ],
                    'alternative_explore': [
                        "How else might someone solve this same problem?",
                        "What if we approached this from completely different angle - like {alternative_angle}?",
                        "Could we achieve similar results with a simpler approach?"
                    ]
                }
            },
            'analysis_phase': {
                'turns': ['swot_intro', 'strength_analysis', 'opportunity_synthesis'],
                'responses': {
                    'swot_intro': [
                        "Let's analyze this strategically. I'll break down the strengths, weaknesses, opportunities, and threats:",
                        "Time for strategic analysis! Here's how I see the SWOT breakdown:",
                        "Let's get analytical. Here's the strategic landscape for your idea:"
                    ],
                    'strength_analysis': [
                        "Your core strengths are: {strengths}. These give you real competitive advantages.",
                        "What's working in your favor: {strengths}. Build on these foundation elements.",
                        "Key advantages: {strengths}. These are your differentiators."
                    ],
                    'opportunity_synthesis': [
                        "The biggest opportunity I see: {opportunity}. How might you capitalize on this?",
                        "Strategic opportunity: {opportunity}. This could be your breakthrough moment.",
                        "Market opening: {opportunity}. Perfect timing to move forward."
                    ]
                }
            },
            'synthesis_phase': {
                'turns': ['combination_intro', 'fusion_strategy', 'next_steps'],
                'responses': {
                    'combination_intro': [
                        "I see opportunities to combine your ideas in innovative ways:",
                        "Let's create something powerful by merging concepts:",
                        "Here's how we can synthesize your thinking:"
                    ],
                    'fusion_strategy': [
                        "Combining {concept1} with {concept2} through {strategy}.",
                        "Hybrid approach: {fusion_description} leveraging both concepts.",
                        "Cross-pollination strategy: {synthesis_method}."
                    ],
                    'next_steps': [
                        "Which direction excites you most? Let's develop that further.",
                        "What aspect should we dive deeper into next?",
                        "Ready to explore one of these combinations in detail?"
                    ]
                }
            }
        }
    
    def get_response_for_flow(self, flow_phase, turn_position, context_data=None):
        """Get appropriate response template for current flow position"""
        if flow_phase not in self.flow_templates:
            return None
        
        flow = self.flow_templates[flow_phase]
        turns = flow['turns']
        
        # Determine current turn
        turn_index = min(turn_position, len(turns) - 1)
        turn_type = turns[turn_index]
        
        # Get response templates for this turn
        templates = flow['responses'][turn_type]
        selected_template = random.choice(templates)
        
        # Fill template variables if context provided
        if context_data:
            selected_template = self._fill_template_variables(selected_template, context_data)
        
        return selected_template
    
    def _fill_template_variables(self, template, context_data):
        """Fill template variables with context-specific information"""
        # Extract context variables
        topics = context_data.get('user_topics', [])
        recent_context = context_data.get('recent_context', '')
        
        # Common variable mapping
        variables = {
            'domain': topics[0] if topics else 'this area',
            'concept_type': topics[0] if topics else 'innovative',
            'problem_area': self._extract_problem_area(recent_context),
            'assumption': self._extract_assumption(recent_context),
            'belief': self._extract_belief(recent_context),
            'action': self._extract_action(recent_context),
            'alternative_angle': random.choice(['user experience', 'business model', 'technology', 'social impact']),
        }
        
        # Fill template
        for var, value in variables.items():
            template = template.replace(f'{{{var}}}', value)
        
        return template
    
    def _extract_problem_area(self, context):
        """Extract problem area from context"""
        problem_indicators = ['problem', 'issue', 'challenge', 'difficulty', 'need']
        words = context.lower().split()
        
        for i, word in enumerate(words):
            if word in problem_indicators and i < len(words) - 1:
                return f"{words[i]} with {words[i+1]}"
        
        return "user challenges"
    
    def _extract_assumption(self, context):
        """Extract assumptions from recent context"""
        assumption_patterns = [
            'users will', 'people want', 'market needs', 'everyone', 'all users'
        ]
        
        for pattern in assumption_patterns:
            if pattern in context.lower():
                return pattern
        
        return "users will adopt this easily"
    
    def _extract_belief(self, context):
        """Extract beliefs from context"""
        return "this approach will work"
    
    def _extract_action(self, context):
        """Extract expected user actions"""
        action_words = ['use', 'buy', 'adopt', 'try', 'change', 'switch']
        words = context.lower().split()
        
        for word in action_words:
            if word in words:
                return word
        
        return "use this solution"

# ===== UNIFIED SYSTEM INITIALIZATION =====

# Initialize system components
memory = ConversationMemory()
router = ConversationRouter()
sentiment_analyzer = SentimentAnalyzer()
dialogue_flow = DialogueFlowManager()
personality_manager = PersonalityManager()

print("🌈 Project Kaleidoscope - UNIFIED SYSTEM LOADING...")
print("📦 Modules: Backend ✓ NLP ✓ Combinations ✓ Diversity ✓ Questioning ✓ Conversational AI ✓")

# ===== API ENDPOINTS =====

@app.route('/', methods=['GET'])
def health_check():
    """Unified system health check"""
    return jsonify({
        "message": "🌈 Project Kaleidoscope Unified System - Ready for Innovation!",
        "status": "connected",
        "version": "Unified v1.0",
        "features": [
            "Idea Submission & Analysis",
            "Semantic Diversity Scoring", 
            "Creative Combinations",
            "Socratic Questioning",
            "SWOT Analysis",
            "Conversational AI",
            "Memory & Context",
            "Voice Integration Ready"
        ],
        "total_ideas": len(ideas),
        "active_conversations": len(conversation_histories)
    })

@app.route('/chat', methods=['POST'])
def chat_with_kai():
    """Main conversational endpoint - handles all user interactions"""
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({"error": "Message is required"}), 400
        
        message = data['message']
        user_id = data.get('user_id', 'anonymous_user')
        
        # Process through conversational router
        result = router.process_conversation(user_id, message, memory)
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/submit_idea', methods=['POST'])
def submit_idea():
    """Direct idea submission endpoint (legacy support)"""
    try:
        data = request.get_json()
        if not data or 'idea_text' not in data:
            return jsonify({"error": "idea_text is required"}), 400
        
        idea_text = data['idea_text']
        user_id = data.get('user_id', 'api_user')
        
        # Process as idea submission through router
        result = router._handle_idea_submission(idea_text, user_id)
        
        # Convert numpy types to Python types for JSON serialization
        def convert_numpy(obj):
            if isinstance(obj, dict):
                return {k: convert_numpy(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [convert_numpy(item) for item in obj]
            elif hasattr(obj, 'item'):  # numpy scalar
                return obj.item()
            elif hasattr(obj, 'tolist'):  # numpy array
                return obj.tolist()
            else:
                return obj
        
        serializable_result = convert_numpy(result)
        
        return jsonify({
            "message": "Idea submitted and analyzed successfully!",
            "idea_id": serializable_result.get('idea_id'),
            "analysis": serializable_result
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/ideas', methods=['GET'])
def get_all_ideas():
    """Get all submitted ideas"""
    try:
        # Convert numpy types to Python types for JSON serialization
        serializable_ideas = []
        for idea in ideas:
            serializable_idea = idea.copy()
            if 'diversity_score' in serializable_idea:
                serializable_idea['diversity_score'] = float(serializable_idea['diversity_score'])
            serializable_ideas.append(serializable_idea)
        
        return jsonify({
            "ideas": serializable_ideas,
            "total": len(serializable_ideas)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_combinations/<int:idea1_id>/<int:idea2_id>', methods=['GET'])
def get_combinations(idea1_id, idea2_id):
    """Get combinations between two specific ideas"""
    try:
        combinations = generate_combinations(idea1_id, idea2_id)
        return jsonify({
            "combinations": combinations,
            "idea1": ideas[idea1_id]['idea_text'] if idea1_id < len(ideas) else None,
            "idea2": ideas[idea2_id]['idea_text'] if idea2_id < len(ideas) else None
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/analyze_diversity/<int:idea_id>', methods=['GET'])
def analyze_diversity(idea_id):
    """Analyze diversity of a specific idea"""
    try:
        if idea_id >= len(ideas):
            return jsonify({"error": "Idea not found"}), 404
        
        idea = ideas[idea_id]
        diversity_analysis = analyze_idea_diversity(idea['idea_text'])
        
        return jsonify({
            "idea": idea,
            "diversity_analysis": diversity_analysis
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/conversation_history/<user_id>', methods=['GET'])
def get_conversation_history(user_id):
    """Get conversation history for a user"""
    history = memory.get_history(user_id)
    return jsonify({
        "user_id": user_id,
        "history": history,
        "message_count": len(history)
    })

@app.route('/reset_conversation/<user_id>', methods=['DELETE'])
def reset_conversation(user_id):
    """Reset conversation history for a user"""
    if user_id in conversation_histories:
        del conversation_histories[user_id]
    
    return jsonify({
        "message": f"Conversation history cleared for {user_id}",
        "status": "reset_complete"
    })

@app.route('/analyze_swot', methods=['POST'])
def analyze_swot():
    """Dedicated SWOT analysis endpoint"""
    try:
        data = request.get_json()
        
        if not data or 'idea_text' not in data:
            return jsonify({"error": "idea_text is required"}), 400
        
        idea_text = data['idea_text'].strip()
        
        if not idea_text:
            return jsonify({"error": "idea_text cannot be empty"}), 400
        
        # Initialize SWOT engine
        swot_engine = SWOTAnalysisEngine()
        questioning_engine = SocraticQuestioningEngine()
        
        # Generate SWOT analysis
        swot = swot_engine.analyze_idea(idea_text)
        
        # Generate strategic questions
        questions = questioning_engine.generate_questions(idea_text, 5)
        
        # Analyze diversity for additional context (use standalone analysis)
        diversity = analyze_standalone_idea_diversity(idea_text)
        
        return jsonify({
            "success": True,
            "idea_text": idea_text,
            "swot": swot,
            "strategic_questions": questions,
            "diversity_metrics": {
                "semantic_diversity": diversity['semantic_diversity'],
                "keyword_diversity": diversity['keyword_diversity'],
                "combined_diversity": diversity['combined_diversity'],
                "diversity_level": diversity['diversity_level'],
                "domains_detected": diversity.get('domains_detected', []),
                "vocabulary_richness": diversity.get('vocabulary_richness', 0),
                "complexity_score": diversity.get('complexity_score', 0)
            },
            "timestamp": datetime.utcnow().isoformat()
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/system_stats', methods=['GET'])
def system_stats():
    """Get comprehensive system statistics"""
    # Calculate diversity statistics
    if ideas:
        diversity_scores = [analyze_idea_diversity(idea['idea_text'])['combined_diversity'] for idea in ideas]
        avg_diversity = sum(diversity_scores) / len(diversity_scores)
    else:
        avg_diversity = 0
    
    return jsonify({
        "system_status": "🌈 Unified System Operational",
        "total_ideas": len(ideas),
        "total_conversations": len(conversation_histories),
        "total_combinations": len(combinations),
        "average_diversity": round(avg_diversity, 3),
        "modules_active": [
            "NLP Embeddings",
            "Diversity Meter", 
            "Combination Engine",
            "Socratic Questioning",
            "SWOT Analysis",
            "Conversational AI",
            "Memory System"
        ]
    })

if __name__ == '__main__':
    print("🚀 Project Kaleidoscope - UNIFIED COGNITIVE DIVERSITY ENGINE")
    print("🌈 ALL SYSTEMS INTEGRATED: Backend + NLP + Combinations + Diversity + Questioning + AI")
    print("💬 Conversational Flow: Ideas → Analysis → Questions → SWOT → Combinations → Refinement")
    print("🧠 Memory System: Context-aware conversations with multi-user support")
    print("🗣️ Voice Ready: Compatible with speech recognition frontend")
    print("🌐 Starting unified server on http://localhost:8001")
    
    app.run(host='0.0.0.0', port=8001, debug=False)